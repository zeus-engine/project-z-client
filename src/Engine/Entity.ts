import { Class } from '../types/Class';
import { IEntity } from './IEntity';
import { IComponent } from './IComponent';

export class Entity implements IEntity {
    private components: Map<Class<IComponent>, IComponent> = new Map();

    public addComponent<T extends IComponent>(type: Class<T>, component: T) {
        this.components.set(type, component);
    }

    public getComponent<T extends IComponent>(type: Class<T>): T {
        const component = this.components.get(type);

        if (component === undefined) {
            throw new ReferenceError('Can\'t get component');
        } else {
            return component as any;
        }
    }

    public hasComponent<T extends IComponent>(type: Class<T>) {
        return Array
            .from(this.components.keys())
            .some(key => key === type);
    }
}
