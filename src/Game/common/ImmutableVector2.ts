export class ImmutableVector2 {
    protected _x: number;
    protected _y: number;
    protected _magnitude: number | null = null;
    protected _normalized: ImmutableVector2 | null = null;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get magnitude(): number {
        return this._magnitude === null
            ? this._magnitude = Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2))
            : this._magnitude;
    }

    public get normalized(): ImmutableVector2 {
        const magnitude = this.magnitude || 1;

        return this._normalized === null
            ? this._normalized = new ImmutableVector2(
                this._x / magnitude,
                this._y / magnitude
            )
            : this._normalized;
    }
}
