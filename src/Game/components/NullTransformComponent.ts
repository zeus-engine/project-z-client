import { ITransformComponent } from '../ITransformComponent';
import { NullGameObject } from '../entities/NullGameObject';
import { Component } from '../../Engine/Component';
import { Vector2 } from '../common/Vector2';

export class NullTransformComponent extends Component implements ITransformComponent {
    public position: Vector2 = new Vector2(0, 0);

    constructor() {
        super(new NullGameObject());
    }
}
