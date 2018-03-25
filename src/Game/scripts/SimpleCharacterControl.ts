import { Game } from '../Game';
import { Script } from '../common/Script';
import { ITransformComponent } from '../ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';
import { Vector2 } from '../common/Vector2';

export class SimpleCharacterControl extends Script {
    public target: ITransformComponent = new NullTransformComponent();

    public update(deltaT: DOMHighResTimeStamp): void {
        if (Game.Input.isPressed('a')) {
            this.target.position = new Vector2(
                this.target.position.x - 0.1 * deltaT,
                this.target.position.y
            );
        }

        if (Game.Input.isPressed('d')) {
            this.target.position = new Vector2(
                this.target.position.x + 0.1 * deltaT,
                this.target.position.y
            );
        }

        if (Game.Input.isPressed('w')) {
            this.target.position = new Vector2(
                this.target.position.x,
                this.target.position.y - 0.1 * deltaT
            );
        }

        if (Game.Input.isPressed('s')) {
            this.target.position = new Vector2(
                this.target.position.x,
                this.target.position.y + 0.1 * deltaT
            )
        }
    }
}
