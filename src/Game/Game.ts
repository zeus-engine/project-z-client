import { Engine } from '../Engine/Engine';
import { IEntity } from '../Engine/IEntity';
import { ISystem } from '../Engine/ISystem';
import { Class } from '../types/Class';
import { Input } from './services/Input';

export class Game {
    static readonly Input: Input = new Input();

    private engine: Engine;
    private entities: Map<string, IEntity> = new Map();
    private systems: Map<Class<ISystem>, ISystem> = new Map();

    constructor() {
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        this.engine = new Engine(this.update, this.render);
    }

    public run(): void {
        this.engine.run();
    }

    public addSystem(systemType: Class<ISystem>, system: ISystem): void {
        this.systems.set(systemType, system);
    }

    public addEntity(alias: string, entity: IEntity): void {
        this.entities.set(alias, entity);
    }

    public getEntity(alias: string): IEntity | undefined {
        return this.entities.get(alias);
    }

    protected render(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.render(Array.from(this.entities.values()), deltaT));
    }

    protected update(deltaT: DOMHighResTimeStamp): void {
        this.systems.forEach(system => system.update(Array.from(this.entities.values()), deltaT));
    }
}
