import { RenderingComponent } from '../Game/components/RenderingComponent';
import { Rectangle } from '../Game/common/Rectangle';
import { GameObject } from '../Game/entities/GameObject';
import { ScriptComponent } from '../Game/components/ScriptComponent';
import { SimpleCharacterControl } from '../Game/scripts/SimpleCharacterControl';

export class Character extends GameObject {
    private rendering = new RenderingComponent(this);
    private script = new ScriptComponent<SimpleCharacterControl>(this);

    constructor() {
        super();

        this.addComponent(RenderingComponent, this.rendering);
        this.addComponent(ScriptComponent, this.script);
        this.rendering.setGraphics(new Rectangle(50, 100));
        this.script.setScript(SimpleCharacterControl);

        this.script.getScript().target = this.transform;
    }
}
