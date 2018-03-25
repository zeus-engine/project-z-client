import { Component } from '../../Engine/Component';
import { Game } from '../Game';

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
