import { RenderingComponent } from '../Game/components/RenderingComponent';
import { Rectangle } from '../Game/Rectangle';
import { GameObject } from '../Game/entities/GameObject';
import { ScriptComponent } from '../Game/components/ScriptComponent';
import { Game } from '../Game/Game';

export class Character extends GameObject {
    rendering = new RenderingComponent(this);
    script = new ScriptComponent(this);

    constructor() {
        super();

        this.update = this.update.bind(this);

        this.addComponent(RenderingComponent, this.rendering);
        this.addComponent(ScriptComponent, this.script);
        this.rendering.setGraphics(new Rectangle(50, 100));
        this.script.setScript(this.update);
    }

    private update(deltaT: DOMHighResTimeStamp): void {
        if (Game.Input.isPressed('a')) {
            this.transform.x -= 5;
        }

        if (Game.Input.isPressed('d')) {
            this.transform.x += 5;
        }

        if (Game.Input.isPressed('w')) {
            this.transform.y -= 5;
        }

        if (Game.Input.isPressed('s')) {
            this.transform.y += 5;
        }
    }
}