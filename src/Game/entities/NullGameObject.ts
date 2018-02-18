import { IGameObject } from '../IGameObject';
import { Class } from '../../types/Class';
import { Component } from '../../Engine/Component';

export class NullGameObject implements IGameObject {
    addComponent<T extends Component>(type: Class<T>, component: T): void {
    }

    getComponent<T extends Component>(type: Class<T>): T {
        throw new ReferenceError();
    }

    hasComponent<T extends Component>(type: Class<T>): boolean {
        return false;
    }
}
