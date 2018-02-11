import { Entity } from '../../Engine/Entity';
import { TransformComponent } from '../components/TransformComponent';

export class GameObject extends Entity {
    public transform = new TransformComponent(this);

    constructor() {
        super();

        this.addComponent(TransformComponent, this.transform);
    }
}
