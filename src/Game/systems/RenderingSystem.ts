import { RenderingComponent } from '../components/RenderingComponent';
import { TransformComponent } from '../components/TransformComponent';
import { IEntity } from '../../Engine/IEntity';
import { Rectangle } from '../common/Rectangle';
import { System } from '../../Engine/System';
import { CameraComponent } from '../components/CameraComponent';

export class RenderingSystem extends System {
    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;

    constructor() {
        super();

        this.offscreenCanvas = new OffscreenCanvas(0, 0);
        this.offscreenContext = this.offscreenCanvas.getContext('2d');
    }

    render(entities: IEntity[], deltaT: DOMHighResTimeStamp): void {
        entities
            .filter(entity => entity.hasComponent(CameraComponent))
            .forEach(entity => {
                const camera = entity.getComponent(CameraComponent);
                const cameraTransform = entity.getComponent(TransformComponent);

                this.offscreenCanvas.width = camera.target.width;
                this.offscreenCanvas.height = camera.target.height;

                entities
                    .filter(entity => {
                        return entity.hasComponent(RenderingComponent) && entity.hasComponent(TransformComponent);
                    })
                    .forEach(entity => {
                        const rendering = entity.getComponent(RenderingComponent);
                        const transform = entity.getComponent(TransformComponent);
                        const graphics = rendering.getGraphics();
                        const x = transform.x - cameraTransform.x;
                        const y = transform.y - cameraTransform.y;

                        if (graphics instanceof Rectangle) {
                            this.offscreenContext.fillStyle = graphics.color;
                            this.offscreenContext.fillRect(x, y, graphics.width, graphics.height);
                        }
                    });

                const imageData = this.offscreenCanvas.transferToImageBitmap();

                camera.target.getContext('bitmaprenderer').transferFromImageBitmap(imageData);
            });
    }
}
