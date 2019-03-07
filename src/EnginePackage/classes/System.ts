import { ISystem } from '../interfaces/ISystem';
import { EntityManager } from '../../SdkPackage/services/EntityManager';

export class System implements ISystem {
    update(entities: EntityManager, deltaT: DOMHighResTimeStamp): void {
    }

    render(entities: EntityManager, deltaT: DOMHighResTimeStamp): void {
    }
}
