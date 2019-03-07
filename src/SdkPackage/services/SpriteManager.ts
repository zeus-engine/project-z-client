import { ResourceManager } from './ResourceManager';
import { ResourceType } from '../enums/ResourceType';
import { Sprite } from '../classes/Sprite';

type SpriteReference = string;

export class SpriteManager {
    private resourceManager: ResourceManager;
    private registry: Map<SpriteReference, Sprite> = new Map();

    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
    }

    public register(identifier: SpriteReference, uri: string): void {
        const sprite = new Sprite();

        this.registry.set(identifier, sprite);
        this.resourceManager.register(ResourceType.Image, identifier, uri);
        this.resourceManager.get(identifier)
            .then(blob => createImageBitmap(blob))
            .then(image => {
                sprite.texture = image;
            });
    }

    public get(identifier: SpriteReference): Sprite {
        const sprite = this.registry.get(identifier);

        if (sprite === undefined) {
            throw new ReferenceError();
        }

        return sprite;
    }
}
