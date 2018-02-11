import { RenderingComponent } from '../components/RenderingComponent';
import { TransformComponent } from '../components/TransformComponent';
import { IEntity } from '../../Engine/IEntity';
import { Rectangle } from '../Rectangle';
import { System } from '../../Engine/System';

export class RenderingSystem extends System {
    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;
    private context: ImageBitmapRenderingContext;

    constructor(canvas: HTMLCanvasElement) {
        super();

        this.offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
        this.offscreenContext = this.offscreenCanvas.getContext('2d');
        this.context = canvas.getContext('bitmaprenderer');
    }

    render(entities: IEntity[], deltaT: DOMHighResTimeStamp): void {
        entities
            .filter(entity => {
                return entity.hasComponent(RenderingComponent) && entity.hasComponent(TransformComponent);
            })
            .forEach(object => {
                const rendering = object.getComponent(RenderingComponent);
                const transform = object.getComponent(TransformComponent);
                const graphics = rendering.getGraphics();

                if (graphics instanceof Rectangle) {
                    this.offscreenContext.fillStyle = graphics.color;
                    this.offscreenContext.fillRect(transform.x, transform.y, graphics.width, graphics.height);
                }
            });

        const imageData = this.offscreenCanvas.transferToImageBitmap();

        this.context.transferFromImageBitmap(imageData);
    }
}
