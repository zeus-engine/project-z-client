import { Engine } from '../Engine/Engine';
import { IEntity } from '../Engine/IEntity';
import { ISystem } from '../Engine/ISystem';
import { Class } from '../types/Class';
import { Input } from './services/Input';
import { ResourceManager } from './services/ResourceManager';
import { SpriteManager } from './services/SpriteManager';
import { EntityManager } from './services/EntityManager';

export class Game {
    static readonly Input: Input = new Input();
    static readonly ResourceManager = new ResourceManager();
    static readonly SpriteManager = new SpriteManager(Game.ResourceManager);

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

    public addEntity(alias: string, entity: IEntity): void {
        this.entityManager.set(alias, entity);
    }

    public getEntity(alias: string): IEntity | undefined {
        return this.entityManager.get(alias);
    }

    protected render(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.render(this.entityManager, deltaT));
    }

    protected update(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.update(this.entityManager, deltaT));
    }
}
