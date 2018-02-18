import { RenderingComponent } from '../components/RenderingComponent';
import { TransformComponent } from '../components/TransformComponent';
import { IEntity } from '../../Engine/IEntity';
import { Rectangle } from '../common/Rectangle';
import { System } from '../../Engine/System';
import { CameraComponent } from '../components/CameraComponent';
import { Vector2 } from '../common/Vector2';

export class RenderingSystem extends System {
    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;

    constructor() {
        super();

        this.offscreenCanvas = new OffscreenCanvas(0, 0);
        this.offscreenContext = this.offscreenCanvas.getContext('2d');
    }

    public render(entities: IEntity[], deltaT: DOMHighResTimeStamp): void {
        entities
            .filter(entity => entity.hasComponent(CameraComponent))
            .forEach(entity => {
                const camera = entity.getComponent(CameraComponent);
                const cameraTransform = entity.getComponent(TransformComponent);
                const cameraHalfWidth = camera.target.width / 2;
                const cameraHalfHeight = camera.target.height / 2;

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
                        const position = new Vector2(
                            transform.position.x - cameraTransform.position.x + cameraHalfWidth,
                            transform.position.y - cameraTransform.position.y + cameraHalfHeight
                        );

                        if (graphics instanceof Rectangle) {
                            this.renderRectangle(graphics, position);
                        }
                    });

                const imageData = this.offscreenCanvas.transferToImageBitmap();

                camera.target.getContext('bitmaprenderer').transferFromImageBitmap(imageData);
            });
    }

    private renderRectangle(rectangle: Rectangle, position: Vector2): void {
        this.offscreenContext.fillStyle = rectangle.color;
        this.offscreenContext.fillRect(
            position.x - rectangle.width / 2,
            position.y - rectangle.height / 2,
            rectangle.width,
            rectangle.height
        );
    }
}
