import { ITransformComponent } from '../interfaces/ITransformComponent';
import { NullGameObject } from '../entities/NullGameObject';
import { Component } from '../../EnginePackage/classes/Component';
import { Vector2 } from '../classes/Vector2';

export class NullTransformComponent extends Component implements ITransformComponent {
    public position: Vector2 = new Vector2(0, 0);
    public scale: Vector2 = new Vector2(1, 1);

    constructor() {
        super(new NullGameObject());
    }
}
