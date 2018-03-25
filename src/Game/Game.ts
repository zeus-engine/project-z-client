import { Engine } from '../Engine/Engine';
import { ISystem } from '../Engine/ISystem';
import { Class } from '../types/Class';
import { Input } from './services/Input';
import { ResourceManager } from './services/ResourceManager';
import { SpriteManager } from './services/SpriteManager';
import { EntityManager } from './services/EntityManager';
import { GameObject } from './entities/GameObject';
import { SortingLayerManager } from './services/SortingLayerManager';

export class Game {
    public static readonly Input: Input = new Input();
    public static readonly ResourceManager = new ResourceManager();
    public static readonly SpriteManager = new SpriteManager(Game.ResourceManager);
    public static readonly SortingLayerManager = new SortingLayerManager();

    private engine: Engine;
    private entityManager: EntityManager = new EntityManager();
    private systems: Map<Class<ISystem>, ISystem> = new Map();

    constructor() {
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        this.engine = new Engine(this.update, this.render);
    }

    public get isRunning(): boolean {
        return this.engine.isRunning;
    }

    public run(): void {
        this.engine.run();
    }

    public pause(): void {
        this.engine.pause();
    }

    public addSystem(systemType: Class<ISystem>, system: ISystem): void {
        this.systems.set(systemType, system);
    }

    public addEntity(entity: GameObject): void {
        this.entityManager.set(entity);
    }

    public getEntity(alias: string): GameObject[] {
        return this.entityManager.get(alias);
    }

    protected render(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.render(this.entityManager, deltaT));
    }

    protected update(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.update(this.entityManager, deltaT));
    }
}
