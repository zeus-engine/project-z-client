import { Component } from '../../Engine/Component';

type SpriteReference = string;

export class SpriteRendererComponent extends Component {
    private sprite: SpriteReference = 'default';

    public setSprite(sprite: SpriteReference): void {
        this.sprite = sprite;
    }

    public getSprite(): SpriteReference {
        return this.sprite;
    }
}
