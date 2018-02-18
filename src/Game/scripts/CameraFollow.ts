import { TransformComponent } from '../components/TransformComponent';
import { Script } from '../common/Script';
import { ITransformComponent } from '../ITransformComponent';
import { NullTransformComponent } from '../components/NullTransformComponent';

export class CameraFollow extends Script {
    public target: ITransformComponent = new NullTransformComponent();

    public update(): void {
        const transformComponent = this.getOwner().getComponent(TransformComponent);

        transformComponent.x = this.target.x;
        transformComponent.y = this.target.y;
    }
}
