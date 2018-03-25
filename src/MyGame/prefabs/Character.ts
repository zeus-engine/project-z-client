import { ShapeRendererComponent } from '../../Game/components/ShapeRendererComponent';
import { Rectangle } from '../../Game/common/Rectangle';
import { GameObject } from '../../Game/entities/GameObject';
import { ScriptComponent } from '../../Game/components/ScriptComponent';
import { SimpleCharacterControl } from '../../Game/scripts/SimpleCharacterControl';
import { SpriteRendererComponent } from '../../Game/components/SpriteRendererComponent';

export class Character extends GameObject {
    private shapeRenderer = new ShapeRendererComponent(this);
    private spriteRenderer = new SpriteRendererComponent(this);
    private script = new ScriptComponent<SimpleCharacterControl>(this);

    constructor() {
        super('Character');

        this.addComponent(ShapeRendererComponent, this.shapeRenderer);
        this.addComponent(SpriteRendererComponent, this.spriteRenderer);
        this.addComponent(ScriptComponent, this.script);
        this.shapeRenderer.setShape(new Rectangle(1, 2));
        this.spriteRenderer.sortingLayer = 'entities';
        this.spriteRenderer.sprite = 'character';

        this.script.setScript(SimpleCharacterControl);
        this.script.getScript().target = this.transform;
    }
}
