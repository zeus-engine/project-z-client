import { IClass } from '../../CorePackage/interfaces/IClass';
import { IEntity } from '../interfaces/IEntity';
import { IComponent } from '../interfaces/IComponent';

export class Entity implements IEntity {
    private components: Map<IClass<IComponent>, IComponent> = new Map();

    public addComponent<T extends IComponent>(type: IClass<T>, component: T) {
        this.components.set(type, component);
    }

    public getComponent<T extends IComponent>(type: IClass<T>): T {
        const component = this.components.get(type);

        if (component === undefined) {
            throw new ReferenceError('Can\'t get component');
        } else {
            return component as any;
        }
    }

    public hasComponent<T extends IComponent>(type: IClass<T>) {
        return Array
            .from(this.components.keys())
            .some(key => key === type);
    }
}
