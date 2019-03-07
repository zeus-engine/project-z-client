import { GameObject } from '../../SdkPackage/entities/GameObject';
import { SpriteRendererComponent } from '../../SdkPackage/components/SpriteRendererComponent';
import { Vector2 } from '../../SdkPackage/classes/Vector2';

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
