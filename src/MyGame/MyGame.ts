import { Game } from '../Game/Game';
import { Character } from './prefabs/Character';
import { RenderingSystem } from '../Game/systems/RenderingSystem';
import { ScriptingSystem } from '../Game/systems/ScriptingSystem';
import { Camera } from '../Game/entities/Camera';
import { CameraComponent } from '../Game/components/CameraComponent';
import { MainCamera } from './prefabs/MainCamera';
import { TransformComponent } from '../Game/components/TransformComponent';
import { Terrain } from './prefabs/Terrain';
import { Vector2 } from '../Game/common/Vector2';

export class MyGame extends Game {
    constructor() {
        super();

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        Game.SpriteManager.register('character', '/assets/character.png');
        Game.SpriteManager.register('grass', '/assets/grass.jpg');

        this.addSystem(RenderingSystem, new RenderingSystem());
        this.addSystem(ScriptingSystem, new ScriptingSystem());

        const character = new Character();
        const cameraA = new MainCamera(this.createCanvas());
        const cameraB = new Camera();

        cameraA.setTarget(character.getComponent(TransformComponent));
        cameraB.getComponent(CameraComponent).target = this.createCanvas();

        for (let y = 0; y < 10; y++) {
            for(let x = 0; x < 10; x++) {
                this.addEntity(`Terrain${x}${y}`, new Terrain(new Vector2(
                    64 * x,
                    64 * y
                )));
            }
        }
        this.addEntity('Character', character);
        this.addEntity('Main Camera', cameraA);
        this.addEntity('Second Camera', cameraB);
        this.run();
    }

    private createCanvas(): HTMLCanvasElement {
        const canvas = document.createElement('canvas');

        canvas.width = 400;
        canvas.height = 300;

        document.body.appendChild(canvas);

        return canvas;
    }
}
