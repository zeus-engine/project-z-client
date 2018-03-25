import channel from 'chansole';

type OnUpdate = (deltaT: DOMHighResTimeStamp) => void;
type OnRender = (deltaT: DOMHighResTimeStamp) => void;

enum EngineState {Running, Paused}

export class Engine {
    private static debug = false;
    private static DEFAULT_UPDATE_TIME = 1000 / 60;
    private static DEFAULT_RENDER_TIME = 1000 / 60;
    private static performance = window.performance;

    private logger: Console;
    private state: EngineState = EngineState.Running;
    private lastUpdate: DOMHighResTimeStamp = Engine.performance.now();
    private lastRender: DOMHighResTimeStamp = Engine.performance.now();
    private updateTime: number;
    private onUpdate: OnUpdate = () => undefined;
    private onRender: OnRender = () => undefined;

    constructor(onUpdate: OnUpdate, onRender: OnRender, updateTime: number = Engine.DEFAULT_UPDATE_TIME) {
        this.onUpdate = onUpdate;
        this.onRender = onRender;
        this.updateTime = updateTime;
        this.logger = channel('Engine');

        this.update = this.update.bind(this);
        this.render = this.render.bind(this);

        this.update(this.lastUpdate);
        this.render(this.lastRender);
    }

    public get isRunning(): boolean {
        return this.state === EngineState.Running;
    }

    public run(): void {
        this.state = EngineState.Running;
    }

    public pause(): void {
        this.state = EngineState.Paused;
    }

    private update(timestamp: DOMHighResTimeStamp): void {
        if (this.state === EngineState.Running) {
            this.onUpdate((timestamp - this.lastUpdate) / Engine.DEFAULT_UPDATE_TIME);
        }

        this.lastUpdate = Engine.performance.now();
        const deltaT = this.lastUpdate - timestamp;

        if (
            Engine.debug === true &&
            deltaT > Engine.DEFAULT_UPDATE_TIME
        ) {
            this.logger.warn(`Update took ${deltaT}ms`);
        }

        window.requestIdleCallback(
            () => this.update(Engine.performance.now()),
            { timeout: this.updateTime }
        );
    }

    private render(timestamp: DOMHighResTimeStamp): void {
        if (this.state === EngineState.Running) {
            this.onRender((timestamp - this.lastRender) / Engine.DEFAULT_RENDER_TIME);
        }

        this.lastRender = Engine.performance.now();
        const deltaT = this.lastRender - timestamp;

        if (
            Engine.debug === true &&
            deltaT > Engine.DEFAULT_RENDER_TIME
        ) {
            this.logger.warn(`Render took ${deltaT}ms`);
        }

        window.requestAnimationFrame(this.render);
    }
}
