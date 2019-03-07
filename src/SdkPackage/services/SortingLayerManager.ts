export class SortingLayerManager {
    public readonly default = 'default';
    private layers: string[] = [this.default];

    public set(layerAlias: string, index: number): void {
        this.layers.splice(index, 0, layerAlias);
    }

    public indexOf(layerAlias: string): number {
        return this.layers.indexOf(layerAlias);
    }
}
