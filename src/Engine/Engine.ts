type OnUpdate = (deltaT: DOMHighResTimeStamp) => void;
type OnRender = (deltaT: DOMHighResTimeStamp) => void;

export class Engine {
    private static DEFAULT_UPDATE_TIME = 1000 / 60;
    private static DEFAULT_RENDER_TIME = 1000 / 60;
    
    private lastUpdate: DOMHighResTimeStamp = 0;
    private lastRender: DOMHighResTimeStamp = 0;
    private updateTime: number;
    private onUpdate: OnUpdate = () => undefined;
    private onRender: OnRender = () => undefined;
    
    constructor(onUpdate: OnUpdate, onRender: OnRender, updateTime: number = Engine.DEFAULT_UPDATE_TIME) { 
        this.onUpdate = onUpdate;
        this.onRender = onRender;
        this.updateTime = updateTime;
        
        this.update = this.update.bind(this);
        this.render = this.render.bind(this);
    }

    public run(): void {
        const now = performance.now();
        
        this.lastUpdate = now;
        this.lastRender = now;
        
        this.update(now);
        this.render(now);
    }

    private update(timestamp: DOMHighResTimeStamp): void {
        this.onUpdate(timestamp - this.lastUpdate);
        this.lastUpdate = performance.now();
        
        const deltaT = this.lastUpdate - timestamp;
        
        if (deltaT > Engine.DEFAULT_UPDATE_TIME) {
            console.warn(`Update took ${deltaT}ms`);
        }
        
        window.requestIdleCallback(() => {
            this.update(performance.now());
        }, {
            timeout: this.updateTime
        });
    }

    private render(timestamp: DOMHighResTimeStamp): void {
        this.onRender(timestamp - this.lastRender);
        this.lastRender = performance.now();
        
        const deltaT = this.lastRender - timestamp;
        
        if (deltaT > Engine.DEFAULT_RENDER_TIME) {
            console.warn(`Render took ${deltaT}ms`);
        }
        
        window.requestAnimationFrame(this.render);
    }
}
