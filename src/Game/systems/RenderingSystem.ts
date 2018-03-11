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
    private static debug = true;

    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;

    constructor() {
        super();

        this.offscreenCanvas = new OffscreenCanvas(0, 0);
        this.offscreenContext = this.offscreenCanvas.getContext('2d', { alpha: false });
        this.offscreenContext.imageSmoothingEnabled = false;
    }

    public render(entityManager: EntityManager, deltaT: DOMHighResTimeStamp): void {
        const cameras = entityManager.filterByComponents(CameraComponent);

        cameras.forEach(entity => {
            const camera = entity.getComponent(CameraComponent);
            const cameraContext = camera.target.getContext('bitmaprenderer');
            const cameraTransform = entity.getComponent(TransformComponent);
            const cameraHalfWidth = camera.target.width * 0.5;
            const cameraHalfHeight = camera.target.height * 0.5;
            const cameraA = new Vector2(
                cameraTransform.position.x - cameraHalfWidth,
                cameraTransform.position.y - cameraHalfHeight
            );
            const cameraB = new Vector2(
                cameraTransform.position.x + cameraHalfWidth,
                cameraTransform.position.y + cameraHalfHeight
            );

            this.offscreenCanvas.width = camera.target.width;
            this.offscreenCanvas.height = camera.target.height;
            this.offscreenContext.setTransform(
                1,
                0,
                0,
                1,
                cameraHalfWidth - cameraTransform.position.x,
                cameraHalfHeight - cameraTransform.position.y
            );

            if (RenderingSystem.debug === true) {
                entityManager.render(this.offscreenContext);
            }

            entityManager
                .filterByRange(cameraA, cameraB)
                .filter(entity => (
                    entity.hasComponent(ShapeRendererComponent) ||
                    entity.hasComponent(SpriteRendererComponent)
                ))
                .forEach(entity => {
                    const transform = entity.getComponent(TransformComponent);

                    if (entity.hasComponent(ShapeRendererComponent)) {
                        const renderer = entity.getComponent(ShapeRendererComponent);

                        this.renderShape(this.offscreenContext, renderer, transform);
                    }

                    if (entity.hasComponent(SpriteRendererComponent)) {
                        const renderer = entity.getComponent(SpriteRendererComponent);

                        this.renderSprite(this.offscreenContext, renderer, transform);
                    }
                });

            const imageBitmap = this.offscreenCanvas.transferToImageBitmap();

            cameraContext.transferFromImageBitmap(imageBitmap);
        });
    }

    private renderShape(
        context: CanvasRenderingContext2D,
        renderer: ShapeRendererComponent,
        transform: TransformComponent
    ): void {
        const shape = renderer.getShape();

        if (shape instanceof Rectangle) {
            this.renderRectangle(context, shape, transform);
        }
    }

    private renderSprite(
        context: CanvasRenderingContext2D,
        renderer: SpriteRendererComponent,
        transform: TransformComponent
    ): void {
        const spriteReferense = renderer.getSprite();
        const sprite = Game.SpriteManager.get(spriteReferense);

        if (sprite !== null) {
            const x = transform.position.x - sprite.width * 0.5;
            const y = transform.position.y - sprite.height * 0.5;

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
        transform: TransformComponent
    ): void {
        context.strokeStyle = rectangle.color;

        context.strokeRect(
            Math.round(transform.position.x - rectangle.width * 0.5) + 0.5,
            Math.round(transform.position.y - rectangle.height * 0.5) + 0.5,
            Math.round(rectangle.width),
            Math.round(rectangle.height)
        );
    }
}
