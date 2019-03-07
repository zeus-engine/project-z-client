import { Camera, CameraFollow, ITransformComponent, ScriptComponent } from '../../SdkPackage';

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
