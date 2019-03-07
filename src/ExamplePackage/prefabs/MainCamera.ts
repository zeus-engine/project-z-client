import { Camera } from '../../SdkPackage/entities/Camera';
import { ScriptComponent } from '../../SdkPackage/components/ScriptComponent';
import { CameraFollow } from '../../SdkPackage/scripts/CameraFollow';
import { ITransformComponent } from '../../SdkPackage/interfaces/ITransformComponent';

export class MainCamera extends Camera {
    private script = new ScriptComponent<CameraFollow>(this);

    constructor(canvas: HTMLCanvasElement) {
        super('Main Camera');

        this.addComponent(ScriptComponent, this.script);
        this.script.setScript(CameraFollow);

        this.camera.target = canvas;
    }

    public setTarget(target: ITransformComponent): void {
        this.script.getScript().target = target;
    }
}
