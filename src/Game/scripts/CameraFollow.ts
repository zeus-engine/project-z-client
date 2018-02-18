import { TransformComponent } from '../components/TransformComponent';
import { Script } from '../common/Script';
import { ITransformComponent } from '../ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';
import { Vector2 } from '../common/Vector2';

export class CameraFollow extends Script {
    public target: ITransformComponent = new NullTransformComponent();
    public velocity: number = 0.1;
    public ahead: number = 1;

    private behindPosition: Vector2 | null = null;

    public update(deltaT: DOMHighResTimeStamp): void {
        const transform = this.getOwner().getComponent(TransformComponent);

        if (this.behindPosition === null) {
            this.behindPosition = transform.position;
        }

        const targetDirection = Vector2.subtract(this.target.position, this.behindPosition);
        const velocity = targetDirection.magnitude * this.velocity;
        const motion = Vector2.multiply(targetDirection.normalized, velocity);

        this.behindPosition = Vector2.add(this.behindPosition, motion);
        transform.position = Vector2.subtract(
            this.target.position,
            Vector2.multiply(
                targetDirection.normalized,
                targetDirection.magnitude * -this.ahead
            )
        );
    }
}
