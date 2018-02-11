import { IEntity } from './IEntity';

export interface IComponent { 
    getOwner(): IEntity
}
