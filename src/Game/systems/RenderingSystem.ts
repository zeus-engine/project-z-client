import { ShapeRendererComponent } from '../components/ShapeRendererComponent';
import { TransformComponent } from '../components/TransformComponent';
import { IEntity } from '../../Engine/IEntity';
import { Rectangle } from '../common/Rectangle';
import { System } from '../../Engine/System';
import { CameraComponent } from '../components/CameraComponent';
import { Vector2 } from '../common/Vector2';
import { SpriteRendererComponent } from '../components/SpriteRendererComponent';
import { Game } from '../Game';

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
                const cameraHalfWidth = camera.target.width * 0.5;
                const cameraHalfHeight = camera.target.height * 0.5;

                this.offscreenCanvas.width = camera.target.width;
                this.offscreenCanvas.height = camera.target.height;

                entities
                    .filter(entity =>
                        entity.hasComponent(TransformComponent) &&
                        (
                            entity.hasComponent(ShapeRendererComponent) ||
                            entity.hasComponent(SpriteRendererComponent)
                        )
                    )
                    .forEach(entity => {
                        const transform = entity.getComponent(TransformComponent);
                        const position = new Vector2(
                            transform.position.x - cameraTransform.position.x + cameraHalfWidth,
                            transform.position.y - cameraTransform.position.y + cameraHalfHeight
                        );

                        if (entity.hasComponent(ShapeRendererComponent)) {
                            const renderer = entity.getComponent(ShapeRendererComponent);

                            this.renderShape(renderer, position);
                        }

                        if (entity.hasComponent(SpriteRendererComponent)) {
                            const renderer = entity.getComponent(SpriteRendererComponent);

                            this.renderSprite(renderer, position);
                        }
                    });

                const imageBitmap = this.offscreenCanvas.transferToImageBitmap();

                camera.target.getContext('bitmaprenderer').transferFromImageBitmap(imageBitmap);
            });
    }

    private renderShape(renderer: ShapeRendererComponent, position: Vector2): void {
        const shape = renderer.getShape();

        if (shape instanceof Rectangle) {
            this.renderRectangle(shape, position);
        }
    }

    private renderSprite(renderer: SpriteRendererComponent, position: Vector2): void {
        const spriteReferense = renderer.getSprite();
        const sprite = Game.SpriteManager.get(spriteReferense);

        if (sprite !== null) {
            this.offscreenContext.drawImage(
                sprite,
                position.x - sprite.width * 0.5,
                position.y - sprite.height * 0.5
            );
        }
    }

    private renderRectangle(rectangle: Rectangle, position: Vector2): void {
        this.offscreenContext.strokeStyle = rectangle.color;
        this.offscreenContext.strokeRect(
            position.x - rectangle.width * 0.5,
            position.y - rectangle.height * 0.5,
            rectangle.width,
            rectangle.height
        );
    }
}
