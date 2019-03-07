import { IGameObject } from '../interfaces/IGameObject';
import { IClass } from '../../CorePackage/interfaces/IClass';
import { Component } from '../../EnginePackage/classes/Component';

export class NullGameObject implements IGameObject {
    addComponent<T extends Component>(type: IClass<T>, component: T): void {
    }

    getComponent<T extends Component>(type: IClass<T>): T {
        throw new ReferenceError();
    }

    hasComponent<T extends Component>(type: IClass<T>): boolean {
        return false;
    }
}
