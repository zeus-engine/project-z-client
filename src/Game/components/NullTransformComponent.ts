import { ITransformComponent } from '../ITransformComponent';
import { NullGameObject } from '../entities/NullGameObject';
import { Component } from '../../Engine/Component';

export class NullTransformComponent extends Component implements ITransformComponent {
    public x: number = 0;
    public y: number = 0;

    constructor() {
        super(new NullGameObject());
    }
}
