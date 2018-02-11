type DOMHighResTimeStamp = number;

interface IdleDeadline {
    readonly didTimeou: boolean;
    timeRemaining(): DOMHighResTimeStamp;
}

interface IdleRequestCallback {
    (deadline: IdleDeadline): void;
}

interface IdleRequestCallbackOptions {
    timeout: number;
}

interface Window {
    requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestCallbackOptions): number;
}

type WebGL2RenderingContext = WebGLRenderingContext;
type DOMString = string;

interface ImageBitmapRenderingContext {
    transferFromImageBitmap(bitmap: ImageBitmap): void;
}

interface OffscreenCanvas {
    width: number;
    height: number;
    getContext(context: '2d', contextAttributes?: Canvas2DContextAttributes): CanvasRenderingContext2D;
    getContext(context: 'webgl', contextAttributes?: WebGLContextAttributes): WebGLRenderingContext;
    getContext(context: 'webgl2', contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext;
    getContext(context: 'bitmaprenderer'): ImageBitmapRenderingContext;
    toBlob(type?: DOMString, encoderOptions?: number): Promise<Blob>;
    transferToImageBitmap(): ImageBitmap;
}

declare var OffscreenCanvas: {
    prototype: OffscreenCanvas;
    new(width: number, height: number): OffscreenCanvas;
};

interface HTMLCanvasElement extends HTMLElement {
    getContext(context: 'webgl2', contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext;
    getContext(context: 'bitmaprenderer'): ImageBitmapRenderingContext;
}
