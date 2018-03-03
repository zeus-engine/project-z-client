import { IComponent } from '../../Engine/IComponent';
import { IEntity } from '../../Engine/IEntity';
import { Class } from '../../types/Class';
import { Component } from '../../Engine/Component';

type CacheKey = Set<Class<IComponent>>;

export class EntityManager {
    private entities: Map<string, IEntity> = new Map();
    private cache: Map<CacheKey, IEntity[]> = new Map();

    public set(alias: string, entity: IEntity): void {
        this.entities.set(alias, entity);
        this.invalidate();
    }

    public get(alias: string): IEntity | undefined {
        return this.entities.get(alias);
    }

    public filter(...components: Array<Class<Component>>): IEntity[] {
        const key = new Set(components);
        const cachedData = this.cache.get(key);

        if (cachedData !== undefined) {
            return cachedData;
        }

        const entities = Array
            .from(this.entities.values())
            .filter(entity => {
                return components.every(component => entity.hasComponent(component));
            });

        this.cache.set(key, entities);

        return entities;
    }

    private invalidate(): void {
        this.cache.clear();
    }
}
