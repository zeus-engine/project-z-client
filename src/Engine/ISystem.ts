import { EntityManager } from '../Game/services/EntityManager';

export interface ISystem {
    update(entities: EntityManager, deltaT: DOMHighResTimeStamp): void;

    render(entities: EntityManager, deltaT: DOMHighResTimeStamp): void;
}
