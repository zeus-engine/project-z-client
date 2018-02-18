import { NullGameObject } from '../entities/NullGameObject';
import { IGameObject } from '../IGameObject';
import { IScript } from '../IScript';

export class NullScript implements IScript {
    private owner: IGameObject = new NullGameObject();

    public update(deltaT: DOMHighResTimeStamp): void {
    }

    public getOwner(): IGameObject {
        return this.owner;
    }
}
