import { ShapeRendererComponent } from '../components/ShapeRendererComponent';
import { TransformComponent } from '../components/TransformComponent';
import { Rectangle } from '../common/Rectangle';
import { System } from '../../Engine/System';
import { CameraComponent } from '../components/CameraComponent';
import { Vector2 } from '../common/Vector2';
import { SpriteRendererComponent } from '../components/SpriteRendererComponent';
import { Game } from '../Game';
import { EntityManager } from '../services/EntityManager';
import { GameObject } from '../entities/GameObject';

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

        for (const cameraObject of cameras) {
            const camera = cameraObject.getComponent(CameraComponent);
            const pixelsPerUnit = camera.halfHeight / camera.orthographicSize;
            const cameraA = new Vector2(
                cameraObject.transform.position.x - camera.orthographicSize,
                cameraObject.transform.position.y - camera.orthographicSize
            );
            const cameraB = new Vector2(
                cameraObject.transform.position.x + camera.orthographicSize,
                cameraObject.transform.position.y + camera.orthographicSize
            );

            this.offscreenCanvas.width = camera.target.width;
            this.offscreenCanvas.height = camera.target.height;
            this.offscreenContext.setTransform(
                1,
                0,
                0,
                1,
                cameraObject.transform.position.x * -pixelsPerUnit + camera.halfWidth,
                cameraObject.transform.position.y * -pixelsPerUnit + camera.halfHeight
            );

            const renderableObjects = entityManager
                .filterByRange(cameraA, cameraB)
                .filter(this.isRenderable)
                .sort(this.compareSortingLayers);

            for (const object of renderableObjects) {
                this.renderObject(object, pixelsPerUnit);
            }

            if (RenderingSystem.debug === true) {
                entityManager.render(this.offscreenContext, pixelsPerUnit);
            }

            const imageBitmap = this.offscreenCanvas.transferToImageBitmap();

            camera.context.transferFromImageBitmap(imageBitmap);
        }
    }

    private renderObject(object: GameObject, pixelsPerUnit: number): void {
        const transform = object.getComponent(TransformComponent);

        if (object.hasComponent(ShapeRendererComponent)) {
            const renderer = object.getComponent(ShapeRendererComponent);

            this.renderShape(this.offscreenContext, pixelsPerUnit, renderer, transform);
        }

        if (object.hasComponent(SpriteRendererComponent)) {
            const renderer = object.getComponent(SpriteRendererComponent);

            this.renderSprite(this.offscreenContext, pixelsPerUnit, renderer, transform);
        }
    }

    private isRenderable(object: GameObject): boolean {
        return (
            object.hasComponent(ShapeRendererComponent) ||
            object.hasComponent(SpriteRendererComponent)
        );
    }

    private compareSortingLayers(a: GameObject, b: GameObject): number {
        const aLayer = a.hasComponent(SpriteRendererComponent)
            ? a.getComponent(SpriteRendererComponent).sortingLayer
            : Game.SortingLayerManager.default;
        const bLayer = b.hasComponent(SpriteRendererComponent)
            ? b.getComponent(SpriteRendererComponent).sortingLayer
            : Game.SortingLayerManager.default;
        const aLayerIndex = Game.SortingLayerManager.indexOf(aLayer);
        const bLayerIndex = Game.SortingLayerManager.indexOf(bLayer);

        return aLayerIndex - bLayerIndex;
    };

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
