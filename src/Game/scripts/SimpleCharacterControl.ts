import { Game } from '../Game';
import { Script } from '../common/Script';
import { ITransformComponent } from '../ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';

export class SimpleCharacterControl extends Script {
    public target: ITransformComponent = new NullTransformComponent();

    public update(deltaT: DOMHighResTimeStamp): void {
        if (Game.Input.isPressed('a')) {
            this.target.x -= 5;
        }

        if (Game.Input.isPressed('d')) {
            this.target.x += 5;
        }

        if (Game.Input.isPressed('w')) {
            this.target.y -= 5;
        }

        if (Game.Input.isPressed('s')) {
            this.target.y += 5;
        }
    }
}
