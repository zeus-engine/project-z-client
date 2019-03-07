import { IScript } from '../interfaces/IScript';
import { IGameObject } from '../interfaces/IGameObject';

export class Script implements IScript {
    private owner: IGameObject;

    constructor(owner: IGameObject) {
        this.owner = owner;
    }

    public update(deltaT: DOMHighResTimeStamp): void {
    }

    public getOwner(): IGameObject {
        return this.owner;
    }
}
