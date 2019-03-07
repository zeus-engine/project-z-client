import { NullGameObject } from '../entities/NullGameObject';
import { IGameObject } from '../interfaces/IGameObject';
import { IScript } from '../interfaces/IScript';

export class NullScript implements IScript {
    private owner: IGameObject = new NullGameObject();

    public update(deltaT: DOMHighResTimeStamp): void {
    }

    public getOwner(): IGameObject {
        return this.owner;
    }
}
