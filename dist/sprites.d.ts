export interface FrameInfo {
    w: number;
    h: number;
    count: number;
}
export declare function spriteUrl(id: number, action: string): string;
export declare function animDataUrl(id: number): string;
export declare function loadImage(url: string): Promise<HTMLImageElement | null>;
export declare function fetchAnimData(id: number): Promise<Record<string, {
    w: number;
    h: number;
}>>;
export declare function calcFrameInfo(img: HTMLImageElement, dims: {
    w: number;
    h: number;
} | undefined): FrameInfo;
//# sourceMappingURL=sprites.d.ts.map