import { Component } from '../../EnginePackage/classes/Component';
import { Game } from '../classes/Game';

type SpriteReference = string;

export class SpriteRendererComponent extends Component {
    public sortingLayer: string = Game.SortingLayerManager.default;
    private _sprite: SpriteReference = 'default';

    public get sprite(): SpriteReference {
        return this._sprite;
    }

    public set sprite(sprite: SpriteReference) {
        this._sprite = sprite;
    }
}
