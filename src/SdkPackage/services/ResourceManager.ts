import { ResourceType } from '../enums/ResourceType';
import { Defer } from '../classes/Defer';

type ResourceReference = string;

type Resource = {
    type: ResourceType,
    uri: string;
    dataPromise: Promise<Blob>;
};

export class ResourceManager {
    private registry: Map<ResourceReference, Resource> = new Map();

    public register(type: ResourceType, identifier: ResourceReference, uri: string): void {
        const blobDefer = new Defer<Blob>();

        this.registry.set(identifier, {
            type: type,
            uri: uri,
            dataPromise: blobDefer.promise,
        });

        this
            .fetch(uri)
            .then(blob => {
                blobDefer.resolve(blob);
            });
    }

    public get(identifier: ResourceReference): Promise<Blob> {
        const resource = this.registry.get(identifier);

        if (resource === undefined) {
            throw new ReferenceError();
        }

        return resource.dataPromise;
    }

    private fetch(uri: string): Promise<Blob> {
        return fetch(uri)
            .then(response => {
                if (response.ok !== true) {
                    throw new Error();
                }

                return response;
            })
            .then(response => response.blob());
    }
}
