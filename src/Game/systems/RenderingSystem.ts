import { ShapeRendererComponent } from '../components/ShapeRendererComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Rectangle } from '../common/Rectangle';
import { System } from '../../Engine/System';
import { CameraComponent } from '../components/CameraComponent';
import { Vector2 } from '../common/Vector2';
import { SpriteRendererComponent } from '../components/SpriteRendererComponent';
import { Game } from '../Game';
import { EntityManager } from '../services/EntityManager';

export class RenderingSystem extends System {
    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;

    constructor() {
        super();

        this.offscreenCanvas = new OffscreenCanvas(0, 0);
        this.offscreenContext = this.offscreenCanvas.getContext('2d', { alpha: false });
        this.offscreenContext.imageSmoothingEnabled = false;
    }

    public render(entities: EntityManager, deltaT: DOMHighResTimeStamp): void {
        const cameras = entities.filter(CameraComponent);
        const renderable = entities
            .filter(TransformComponent)
            .filter(entity =>
                (
                    entity.hasComponent(ShapeRendererComponent) ||
                    entity.hasComponent(SpriteRendererComponent)
                )
            );

        cameras.forEach(entity => {
            const camera = entity.getComponent(CameraComponent);
            const cameraContext = camera.target.getContext('bitmaprenderer');
            const cameraTransform = entity.getComponent(TransformComponent);
            const cameraHalfWidth = camera.target.width * 0.5;
            const cameraHalfHeight = camera.target.height * 0.5;

            this.offscreenCanvas.width = camera.target.width;
            this.offscreenCanvas.height = camera.target.height;

            renderable
                .filter(entity => {
                    const transform = entity.getComponent(TransformComponent);

                    return (
                        transform.position.x < cameraTransform.position.x + cameraHalfWidth &&
                        transform.position.x > cameraTransform.position.x - cameraHalfWidth &&
                        transform.position.y < cameraTransform.position.y + cameraHalfHeight &&
                        transform.position.y > cameraTransform.position.y - cameraHalfHeight
                    )
                })
                .forEach(entity => {
                    const transform = entity.getComponent(TransformComponent);
                    const position = new Vector2(
                        transform.position.x - cameraTransform.position.x + cameraHalfWidth,
                        transform.position.y - cameraTransform.position.y + cameraHalfHeight
                    );

                    if (entity.hasComponent(ShapeRendererComponent)) {
                        const renderer = entity.getComponent(ShapeRendererComponent);

                        this.renderShape(this.offscreenContext, renderer, position);
                    }

                    if (entity.hasComponent(SpriteRendererComponent)) {
                        const renderer = entity.getComponent(SpriteRendererComponent);

                        this.renderSprite(this.offscreenContext, renderer, position);
                    }
                });

            const imageBitmap = this.offscreenCanvas.transferToImageBitmap();

            cameraContext.transferFromImageBitmap(imageBitmap);
        });
    }

    private renderShape(
        context: CanvasRenderingContext2D,
        renderer: ShapeRendererComponent,
        position: Vector2
    ): void {
        const shape = renderer.getShape();

        if (shape instanceof Rectangle) {
            this.renderRectangle(context, shape, position);
        }
    }

    private renderSprite(
        context: CanvasRenderingContext2D,
        renderer: SpriteRendererComponent,
        position: Vector2
    ): void {
        const spriteReferense = renderer.getSprite();
        const sprite = Game.SpriteManager.get(spriteReferense);

        if (sprite !== null) {
            const x = position.x - sprite.width * 0.5;
            const y = position.y - sprite.height * 0.5;
            context.drawImage(
                sprite,
                0, 0, sprite.width, sprite.height,
                x, y, sprite.width, sprite.height
            );
        }
    }

    private renderRectangle(
        context: CanvasRenderingContext2D,
        rectangle: Rectangle,
        position: Vector2
    ): void {
        context.strokeStyle = rectangle.color;
        context.strokeRect(
            position.x - rectangle.width * 0.5,
            position.y - rectangle.height * 0.5,
            rectangle.width,
            rectangle.height
        );
    }
}
