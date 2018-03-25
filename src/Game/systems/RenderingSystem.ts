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
    private static imageSmoothingEnabled = false;
    private offscreenCanvas: OffscreenCanvas;
    private offscreenContext: CanvasRenderingContext2D;

    constructor() {
        super();

        this.offscreenCanvas = new OffscreenCanvas(0, 0);
        this.offscreenContext = this.offscreenCanvas.getContext('2d', { alpha: false });
        this.offscreenContext.imageSmoothingEnabled = RenderingSystem.imageSmoothingEnabled;
    }

    public render(entityManager: EntityManager, deltaT: DOMHighResTimeStamp): void {
        const cameras = entityManager.filterByComponents(CameraComponent);

        cameras.forEach(entity => {
            const camera = entity.getComponent(CameraComponent);
            const cameraTransform = entity.getComponent(TransformComponent);
            const pixelsPerUnit = camera.halfHeight / camera.orthographicSize;
            const cameraA = new Vector2(
                cameraTransform.position.x - camera.orthographicSize,
                cameraTransform.position.y - camera.orthographicSize
            );
            const cameraB = new Vector2(
                cameraTransform.position.x + camera.orthographicSize,
                cameraTransform.position.y + camera.orthographicSize
            );

            this.offscreenCanvas.width = camera.target.width;
            this.offscreenCanvas.height = camera.target.height;
            this.offscreenContext.setTransform(
                1,
                0,
                0,
                1,
                cameraTransform.position.x * -pixelsPerUnit + camera.halfWidth,
                cameraTransform.position.y * -pixelsPerUnit + camera.halfHeight
            );

            entityManager
                .filterByRange(cameraA, cameraB)
                .filter(entity => (
                    entity.hasComponent(ShapeRendererComponent) ||
                    entity.hasComponent(SpriteRendererComponent)
                ))
                .sort((a, b) => {
                    const aLayer = a.hasComponent(SpriteRendererComponent)
                        ? a.getComponent(SpriteRendererComponent).sortingLayer
                        : Game.SortingLayerManager.default;
                    const bLayer = b.hasComponent(SpriteRendererComponent)
                        ? b.getComponent(SpriteRendererComponent).sortingLayer
                        : Game.SortingLayerManager.default;
                    const aLayerIndex = Game.SortingLayerManager.indexOf(aLayer);
                    const bLayerIndex = Game.SortingLayerManager.indexOf(bLayer);

                    return aLayerIndex - bLayerIndex;
                })
                .forEach(entity => {
                    const transform = entity.getComponent(TransformComponent);

                    if (entity.hasComponent(ShapeRendererComponent)) {
                        const renderer = entity.getComponent(ShapeRendererComponent);

                        this.renderShape(this.offscreenContext, pixelsPerUnit, renderer, transform);
                    }

                    if (entity.hasComponent(SpriteRendererComponent)) {
                        const renderer = entity.getComponent(SpriteRendererComponent);

                        this.renderSprite(this.offscreenContext, pixelsPerUnit, renderer, transform);
                    }
                });

            if (RenderingSystem.debug === true) {
                entityManager.render(this.offscreenContext, pixelsPerUnit);
            }

            const imageBitmap = this.offscreenCanvas.transferToImageBitmap();

            camera.context.transferFromImageBitmap(imageBitmap);
        });
    }

    private renderShape(
        context: CanvasRenderingContext2D,
        pixelsPerUnit: number,
        renderer: ShapeRendererComponent,
        transform: TransformComponent
    ): void {
        const shape = renderer.getShape();

        if (shape instanceof Rectangle) {
            this.renderRectangle(context, pixelsPerUnit, shape, transform);
        }
    }

    private renderSprite(
        context: CanvasRenderingContext2D,
        pixelsPerUnit: number,
        renderer: SpriteRendererComponent,
        transform: TransformComponent
    ): void {
        const spriteReferense = renderer.sprite;
        const sprite = Game.SpriteManager.get(spriteReferense);

        if (sprite.texture !== null) {
            const width = transform.scale.x * sprite.factor.x * pixelsPerUnit;
            const height = transform.scale.y * sprite.factor.y * pixelsPerUnit;
            const x = transform.position.x * pixelsPerUnit - width * sprite.pivot.x;
            const y = transform.position.y * pixelsPerUnit - height * sprite.pivot.y;

            context.drawImage(
                sprite.texture,
                0, 0, sprite.texture.width, sprite.texture.height,
                x, y, width, height
            );
        }
    }

    private renderRectangle(
        context: CanvasRenderingContext2D,
        pixelsPerUnit: number,
        rectangle: Rectangle,
        transform: TransformComponent
    ): void {
        context.strokeStyle = rectangle.color;

        const width = rectangle.width * pixelsPerUnit;
        const height = rectangle.height * pixelsPerUnit;
        const x = transform.position.x * pixelsPerUnit - width * 0.5;
        const y = transform.position.y * pixelsPerUnit - height * 0.5;

        context.strokeRect(
            Math.round(x) + 0.5,
            Math.round(y) + 0.5,
            Math.round(width),
            Math.round(height)
        );
    }
}
