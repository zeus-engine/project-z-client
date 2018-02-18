import { Component } from '../../Engine/Component';
import { ITransformComponent } from '../ITransformComponent';

export class TransformComponent extends Component implements ITransformComponent {
    public x: number = 0;
    public y: number = 0;
}
