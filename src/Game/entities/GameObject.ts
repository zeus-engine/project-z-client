import { Entity } from '../../Engine/Entity';
import { TransformComponent } from '../components/TransformComponent';
import { IGameObject } from '../IGameObject';

export class GameObject extends Entity implements IGameObject {
    public transform = new TransformComponent(this);

    constructor() {
        super();

        this.addComponent(TransformComponent, this.transform);
    }
}
