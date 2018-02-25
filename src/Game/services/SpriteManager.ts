import { ResourceManager } from './ResourceManager';
import { ResourceType } from '../common/ResourceType';

type SpriteReference = string;

export class SpriteManager {
    private resourceManager: ResourceManager;
    private registry: Map<SpriteReference, ImageBitmap | null> = new Map();

    constructor(resourceManager: ResourceManager) {
        this.resourceManager = resourceManager;
    }

    public register(identifier: SpriteReference, uri: string): void {
        this.registry.set(identifier, null);
        this.resourceManager.register(ResourceType.Image, identifier, uri);
        this.resourceManager.get(identifier)
            .then(blob => createImageBitmap(blob))
            .then(image => this.registry.set(identifier, image));
    }

    public get(identifier: SpriteReference): ImageBitmap | null {
        const sprite = this.registry.get(identifier);

        if (sprite === undefined) {
            throw new ReferenceError();
        }

        return sprite;
    }
}
