import { Game } from '../Game/Game';
import { Character } from './Character';
import { RenderingSystem } from '../Game/systems/RenderingSystem';
import { ScriptingSystem } from '../Game/systems/ScriptingSystem';
import { Camera } from '../Game/entities/Camera';
import { CameraComponent } from '../Game/components/CameraComponent';
import { ScriptComponent } from '../Game/components/ScriptComponent';
import { MainCamera } from './MainCamera';
import { CameraFollow } from '../Game/scripts/CameraFollow';
import { TransformComponent } from '../Game/components/TransformComponent';

export class MyGame extends Game {
    constructor() {
        super();

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        const character = new Character();
        const cameraA = new MainCamera(this.createCanvas());
        const cameraB = new Camera();

        cameraA.setTarget(character.getComponent(TransformComponent));
        cameraB.getComponent(CameraComponent).target = this.createCanvas();

        this.addSystem(RenderingSystem, new RenderingSystem());
        this.addSystem(ScriptingSystem, new ScriptingSystem());
        this.addEntity('character', character);
        this.addEntity('Main Camera', cameraA);
        this.addEntity('Second Camera', cameraB);
        this.run();
    }

    createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');

        canvas.width = 400;
        canvas.height = 300;

        document.body.appendChild(canvas);

        return canvas;
    }
}
