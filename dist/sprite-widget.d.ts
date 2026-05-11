import { type FrameInfo } from './sprites.js';
declare const ACTIONS: readonly ["Walk", "Idle", "Attack", "Sleep"];
export type Action = (typeof ACTIONS)[number];
export declare const FRAME_MS = 150;
export declare const SCALE = 2;
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
export declare function getActiveWidgets(): SpriteWidget[];
export declare function setActiveWidgets(widgets: SpriteWidget[]): void;
export declare function isAnimRunning(): boolean;
export declare function setAnimRunning(running: boolean): void;
export declare function resetWidgets(): void;
export declare function startAnimLoop(): void;
export declare function createSpriteWidget(dexId: number): Promise<HTMLCanvasElement | null>;
export {};
//# sourceMappingURL=sprite-widget.d.ts.map