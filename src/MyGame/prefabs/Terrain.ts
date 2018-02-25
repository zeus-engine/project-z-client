import { GameObject } from '../../Game/entities/GameObject';
import { SpriteRendererComponent } from '../../Game/components/SpriteRendererComponent';
import { TransformComponent } from '../../Game/components/TransformComponent';
import { Vector2 } from '../../Game/common/Vector2';

export class Terrain extends GameObject {
    private spriteRenderer = new SpriteRendererComponent(this);

    constructor(position: Vector2) {
        super();

        this.addComponent(SpriteRendererComponent, this.spriteRenderer);
        this.getComponent(SpriteRendererComponent).setSprite('grass');
        this.getComponent(TransformComponent).position = position;
    }
}
