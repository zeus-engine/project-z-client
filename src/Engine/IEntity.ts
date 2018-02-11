import { Class } from '../types/Class';
import { Component } from './Component';

export interface IEntity {
    addComponent<T extends Component>(type: Class<T>, component: T): void;
    getComponent<T extends Component>(type: Class<T>): T;
    hasComponent<T extends Component>(type: Class<T>): boolean;
}
