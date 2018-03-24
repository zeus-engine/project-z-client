import { Game } from '../Game';
import { Script } from '../common/Script';
import { ITransformComponent } from '../ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';

export class SimpleCharacterControl extends Script {
    public target: ITransformComponent = new NullTransformComponent();

    public update(deltaT: DOMHighResTimeStamp): void {
        if (Game.Input.isPressed('a')) {
            this.target.position.x -= 0.1 * deltaT;
        }

        if (Game.Input.isPressed('d')) {
            this.target.position.x += 0.1 * deltaT;
        }

        if (Game.Input.isPressed('w')) {
            this.target.position.y -= 0.1 * deltaT;
        }

        if (Game.Input.isPressed('s')) {
            this.target.position.y += 0.1 * deltaT;
        }
    }
}
