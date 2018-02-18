import { IGameObject } from './IGameObject';

export interface IScript {
    update(deltaT: DOMHighResTimeStamp): void;

    getOwner(): IGameObject;
}
