import { IEntity } from './IEntity';

export interface ISystem {
    update(entities: IEntity[], deltaT: DOMHighResTimeStamp): void;

    render(entities: IEntity[], deltaT: DOMHighResTimeStamp): void;
}
