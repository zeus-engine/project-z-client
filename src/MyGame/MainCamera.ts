import { Camera } from '../Game/entities/Camera';
import { ScriptComponent } from '../Game/components/ScriptComponent';
import { CameraFollow } from '../Game/scripts/CameraFollow';
import { CameraComponent } from '../Game/components/CameraComponent';
import { ITransformComponent } from '../Game/ITransformComponent';

export class MainCamera extends Camera {
    private script = new ScriptComponent<CameraFollow>(this);

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.addComponent(ScriptComponent, this.script);
        this.script.setScript(CameraFollow);

        this.getComponent(CameraComponent).target = canvas;
    }

    public setTarget(target: ITransformComponent): void {
        this.script.getScript().target = target;
    }
}
