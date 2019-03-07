import { IComponent } from '../interfaces/IComponent';
import { IEntity } from '../interfaces/IEntity';

export class Component implements IComponent {
    private owner: IEntity;

    constructor(owner: IEntity) {
        this.owner = owner;
    }

    public getOwner(): IEntity {
        return this.owner;
    }
}
