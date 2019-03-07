/// <reference lib="dom" />

export {};

declare global {
    interface Window {
        requestIdleCallback(callback: IdleRequestCallback, options?: IdleRequestCallbackOptions): number;
    }

    interface HTMLCanvasElement extends HTMLElement {
        getContext(context: 'webgl2', contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext;

        getContext(context: 'bitmaprenderer'): ImageBitmapRenderingContext;
    }

    interface OffscreenCanvas {
        width: number;
        height: number;
        getContext(context: '2d', contextAttributes?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D;
        getContext(context: 'webgl', contextAttributes?: WebGLContextAttributes): WebGLRenderingContext;
        getContext(context: 'webgl2', contextAttributes?: WebGLContextAttributes): WebGL2RenderingContext;
        getContext(context: 'bitmaprenderer'): ImageBitmapRenderingContext;
        toBlob(type?: DOMString, encoderOptions?: number): Promise<Blob>;
        transferToImageBitmap(): ImageBitmap;
    }

    const OffscreenCanvas: {
        prototype: OffscreenCanvas;
        new(width: number, height: number): OffscreenCanvas;
    };

    interface IdleDeadline {
        readonly didTimeout: boolean;
        timeRemaining(): DOMHighResTimeStamp;
    }

    interface IdleRequestCallback {
        (deadline: IdleDeadline): void;
    }

    interface IdleRequestCallbackOptions {
        timeout: number;
    }

    type WebGL2RenderingContext = WebGLRenderingContext;
    type DOMString = string;
}
