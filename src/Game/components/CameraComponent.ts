import { Component } from '../../Engine/Component';

export class CameraComponent extends Component {
    public orthographicSize: number = 1;
    private _target: HTMLCanvasElement = document.createElement('canvas');
    private _context: ImageBitmapRenderingContext = this._target.getContext('bitmaprenderer');
    private _halfWidth: number = 200;
    private _halfHeight: number = 150;

    get target(): HTMLCanvasElement {
        return this._target;
    }

    set target(element: HTMLCanvasElement) {
        this._target = element;

        this._context = element.getContext('bitmaprenderer');
        this._halfWidth = element.width * 0.5;
        this._halfHeight = element.height * 0.5;
    }

    get halfWidth(): number {
        return this._halfWidth;
    }

    get halfHeight(): number {
        return this._halfHeight;
    }

    get context(): ImageBitmapRenderingContext {
        return this._context;
    }
}
