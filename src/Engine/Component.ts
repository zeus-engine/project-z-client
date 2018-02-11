import { IComponent } from './IComponent';
import { IEntity } from './IEntity';

export class Component implements IComponent {
    private owner: IEntity;

    constructor(owner: IEntity) {
        this.owner = owner;
    }

    public getOwner(): IEntity {
        return this.owner;
    }
}
