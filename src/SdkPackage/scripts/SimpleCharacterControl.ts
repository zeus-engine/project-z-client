import { Game } from '../classes/Game';
import { Script } from '../classes/Script';
import { ITransformComponent } from '../interfaces/ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';
import { Vector2 } from '../classes/Vector2';

export class SimpleCharacterControl extends Script {
    public target: ITransformComponent = new NullTransformComponent();

    public update(deltaT: DOMHighResTimeStamp): void {
        if (Game.Input.isPressed('a')) {
            this.target.position = new Vector2(
                this.target.position.x - 0.1 * deltaT,
                this.target.position.y,
            );
        }

        if (Game.Input.isPressed('d')) {
            this.target.position = new Vector2(
                this.target.position.x + 0.1 * deltaT,
                this.target.position.y,
            );
        }

        if (Game.Input.isPressed('w')) {
            this.target.position = new Vector2(
                this.target.position.x,
                this.target.position.y - 0.1 * deltaT,
            );
        }

        if (Game.Input.isPressed('s')) {
            this.target.position = new Vector2(
                this.target.position.x,
                this.target.position.y + 0.1 * deltaT,
            );
        }
    }
}
