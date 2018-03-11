import { GameObject } from './GameObject';
import { CameraComponent } from '../components/CameraComponent';

export class Camera extends GameObject {
    public camera = new CameraComponent(this);

    constructor(name: string) {
        super(name);

        this.addComponent(CameraComponent, this.camera);
    }
}
