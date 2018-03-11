import { Entity } from '../../Engine/Entity';
import { TransformComponent } from '../components/TransformComponent';
import { IGameObject } from '../IGameObject';

export class GameObject extends Entity implements IGameObject {
    public transform = new TransformComponent(this);
    public name: string;

    constructor(name: string = 'Game Object') {
        super();

        this.name = name;

        this.addComponent(TransformComponent, this.transform);
    }
}
