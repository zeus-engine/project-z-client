import { Entity } from '../../EnginePackage/classes/Entity';
import { TransformComponent } from '../components/TransformComponent';
import { IGameObject } from '../interfaces/IGameObject';

export class GameObject extends Entity implements IGameObject {
    public transform = new TransformComponent(this);
    public name: string;

    constructor(name: string = 'Game Object') {
        super();

        this.name = name;

        this.addComponent(TransformComponent, this.transform);
    }
}
