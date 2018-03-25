import { Game } from '../Game/Game';
import { Character } from './prefabs/Character';
import { RenderingSystem } from '../Game/systems/RenderingSystem';
import { ScriptingSystem } from '../Game/systems/ScriptingSystem';
import { Camera } from '../Game/entities/Camera';
import { MainCamera } from './prefabs/MainCamera';
import { Terrain } from './prefabs/Terrain';
import { Vector2 } from '../Game/common/Vector2';

export class MyGame extends Game {
    constructor() {
        super();

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        this.createControls();

        Game.SortingLayerManager.set('terrain', 1);
        Game.SortingLayerManager.set('entities', 2);

        Game.SpriteManager.register('character', '/assets/character.png');
        Game.SpriteManager.register('grass', '/assets/grass.png');

        Game.SpriteManager.get('character').pixelsPerUnit = 36;
        Game.SpriteManager.get('grass').pixelsPerUnit = 36;

        this.addSystem(RenderingSystem, new RenderingSystem());
        this.addSystem(ScriptingSystem, new ScriptingSystem());

        const character = new Character();
        const cameraA = new MainCamera(this.createCanvas(800, 600));
        const cameraB = new Camera('Second Camera');

        cameraA.setTarget(character.transform);
        cameraA.transform.scale = new Vector2(1, 1);
        cameraA.camera.orthographicSize = 300 / 36;
        cameraB.camera.target = this.createCanvas(300, 300);
        cameraB.camera.orthographicSize = 150 / 9;

        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                this.addEntity(new Terrain(new Vector2(x, y)));
            }
        }

        this.addEntity(character);
        this.addEntity(cameraA);
        this.addEntity(cameraB);

        // TODO should depends on the resources
        setTimeout(() => this.pause(), 500);
    }

    private createCanvas(width: number, height: number): HTMLCanvasElement {
        const canvas = document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        document.body.appendChild(canvas);

        return canvas;
    }

    private createControls(): void {
        const button = document.createElement('button');

        button.textContent = '>';

        button.addEventListener('click', () => {
            this.isRunning
                ? (this.pause(), button.textContent = '>')
                : (this.run(), button.textContent = '||');
        }, false);
        document.body.appendChild(button);
    }
}
