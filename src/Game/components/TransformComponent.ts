import { Component } from '../../Engine/Component';
import { ITransformComponent } from '../ITransformComponent';
import { Vector2 } from '../common/Vector2';

export class TransformComponent extends Component implements ITransformComponent {
    public position: Vector2 = new Vector2(0, 0);
}
