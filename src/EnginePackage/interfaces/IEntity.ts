import { IClass } from '../../CorePackage/interfaces/IClass';
import { Component } from '../classes/Component';

export interface IEntity {
    addComponent<T extends Component>(type: IClass<T>, component: T): void;

    getComponent<T extends Component>(type: IClass<T>): T;

    hasComponent<T extends Component>(type: IClass<T>): boolean;
}
