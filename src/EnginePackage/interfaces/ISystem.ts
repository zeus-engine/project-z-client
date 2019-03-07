import { EntityManager } from '../../SdkPackage/services/EntityManager';

export interface ISystem {
    update(entities: EntityManager, deltaT: DOMHighResTimeStamp): void;

    render(entities: EntityManager, deltaT: DOMHighResTimeStamp): void;
}
