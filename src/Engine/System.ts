import { ISystem } from './ISystem';
import { IEntity } from './IEntity';

export class System implements ISystem {
    update(entities: IEntity[], deltaT: DOMHighResTimeStamp): void {
    }

    render(entities: IEntity[], deltaT: DOMHighResTimeStamp): void {
    }
}
