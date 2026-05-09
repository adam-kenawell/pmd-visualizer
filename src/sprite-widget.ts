// Animated sprite widget for PMD sprites

import { spriteUrl, loadImage, fetchAnimData, calcFrameInfo, type FrameInfo } from './sprites.js';

const ACTIONS = ['Walk', 'Idle', 'Attack'] as const;
export type Action = (typeof ACTIONS)[number];

export const FRAME_MS = 150;
export const SCALE = 2;

export interface SpriteWidget {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sheets: Record<Action, HTMLImageElement | null>;
  frameInfo: Record<Action, FrameInfo | null>;
  frame: number;
  state: 'idle' | 'attacking';
  stateEnd: number;
  direction: number;
}

let activeWidgets: SpriteWidget[] = [];
let animRunning = false;

export function getActiveWidgets(): SpriteWidget[] {
  return activeWidgets;
}

export function setActiveWidgets(widgets: SpriteWidget[]): void {
  activeWidgets = widgets;
}

export function isAnimRunning(): boolean {
  return animRunning;
}

export function setAnimRunning(running: boolean): void {
  animRunning = running;
}

export function resetWidgets(): void {
  activeWidgets = [];
  animRunning = false;
}

export function startAnimLoop(): void {
  if (animRunning) return;
  animRunning = true;
  let last = 0;
  function loop(ts: number) {
    if (activeWidgets.length === 0) { animRunning = false; return; }
    const now = performance.now();
    if (ts - last >= FRAME_MS) {
      last = ts;
      for (const w of activeWidgets) {
        const action: Action = w.state === 'attacking' ? 'Attack' : 'Idle';
        const sheet = w.sheets[action] || w.sheets.Idle || w.sheets.Walk;
        const info = w.frameInfo[action] || w.frameInfo.Idle || w.frameInfo.Walk;
        if (!sheet || !info) continue;

        const frameIdx = w.frame % info.count;
        w.ctx.clearRect(0, 0, w.canvas.width, w.canvas.height);
        w.ctx.imageSmoothingEnabled = false;
        w.ctx.drawImage(
          sheet,
          frameIdx * info.w, w.direction * info.h, info.w, info.h,
          0, 0, info.w * SCALE, info.h * SCALE,
        );
        w.frame++;

        if (w.state === 'attacking' && now > w.stateEnd) {
          w.state = 'idle';
          w.frame = 0;
        }
      }
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

export async function createSpriteWidget(dexId: number): Promise<HTMLCanvasElement | null> {
  if (dexId <= 0) return null;

  const [animDims, walkImg, idleImg, attackImg] = await Promise.all([
    fetchAnimData(dexId),
    loadImage(spriteUrl(dexId, 'Walk')),
    loadImage(spriteUrl(dexId, 'Idle')),
    loadImage(spriteUrl(dexId, 'Attack')),
  ]);

  if (!walkImg && !idleImg) return null;

  const sheets: Record<Action, HTMLImageElement | null> = { Walk: walkImg, Idle: idleImg, Attack: attackImg };
  const frameInfo: Record<Action, FrameInfo | null> = {
    Walk: walkImg ? calcFrameInfo(walkImg, animDims['Walk']) : null,
    Idle: idleImg ? calcFrameInfo(idleImg, animDims['Idle']) : null,
    Attack: attackImg ? calcFrameInfo(attackImg, animDims['Attack']) : null,
  };

  const info = frameInfo.Idle || frameInfo.Walk!;
  const canvas = document.createElement('canvas');
  canvas.width = info.w * SCALE;
  canvas.height = info.h * SCALE;
  canvas.className = 'poke-sprite-canvas';
  const ctx = canvas.getContext('2d')!;

  const widget: SpriteWidget = {
    canvas, ctx, sheets, frameInfo,
    frame: 0, state: 'idle', stateEnd: 0, direction: 0,
  };

  canvas.addEventListener('click', () => {
    if (widget.sheets.Attack) {
      widget.state = 'attacking';
      widget.frame = 0;
      widget.stateEnd = performance.now() + 1000;
    }
  });

  activeWidgets.push(widget);
  startAnimLoop();
  return canvas;
}
