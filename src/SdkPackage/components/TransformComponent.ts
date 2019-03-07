import { Component } from '../../EnginePackage/classes/Component';
import { ITransformComponent } from '../interfaces/ITransformComponent';
import { ImmutableVector2 } from '../classes/ImmutableVector2';

export class TransformComponent extends Component implements ITransformComponent {
    public hasChanged: boolean = false;
    private _position: ImmutableVector2 = new ImmutableVector2(0, 0);
    private _scale: ImmutableVector2 = new ImmutableVector2(1, 1);

    public get position(): ImmutableVector2 {
        return this._position;
    }

    public set position(value: ImmutableVector2) {
        this._position = new ImmutableVector2(value.x, value.y);
        this.hasChanged = true;
    }

    public get scale(): ImmutableVector2 {
        return this._scale;
    }

    public set scale(value: ImmutableVector2) {
        this._scale = new ImmutableVector2(value.x, value.y);
        this.hasChanged = true;
    }
}
