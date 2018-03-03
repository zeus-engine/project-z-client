import { ISystem } from './ISystem';
import { EntityManager } from '../Game/services/EntityManager';

export class System implements ISystem {
    update(entities: EntityManager, deltaT: DOMHighResTimeStamp): void {
    }

    render(entities: EntityManager, deltaT: DOMHighResTimeStamp): void {
    }
}
