import { GameObject } from '../../Game/entities/GameObject';
import { SpriteRendererComponent } from '../../Game/components/SpriteRendererComponent';
import { Vector2 } from '../../Game/common/Vector2';

export class Terrain extends GameObject {
    private spriteRenderer = new SpriteRendererComponent(this);

    constructor(position: Vector2) {
        super();

        this.addComponent(SpriteRendererComponent, this.spriteRenderer);

        this.spriteRenderer.sprite = 'grass';
        this.spriteRenderer.sortingLayer = 'terrain';
        this.transform.position = position;
    }
}
