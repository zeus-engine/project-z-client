type LerpInterpolant = number; // 0 <= x <= 1

export class Vector2 {
    public static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(
            a.x + b.x,
            a.y + b.y
        );
    }

    public static subtract(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(
            a.x - b.x,
            a.y - b.y
        );
    }

    public static multiply(vector: Vector2, multiplier: number): Vector2 {
        return new Vector2(
            vector.x * multiplier,
            vector.y * multiplier
        );
    }

    public static negative(vector: Vector2): Vector2 {
        return new Vector2(
            -vector.x,
            -vector.y
        );
    }

    public static lerp(a: Vector2, b: Vector2, interpolant: LerpInterpolant): Vector2 {
        return new Vector2(
            (a.x + b.x) * interpolant,
            (a.y + b.y) * interpolant
        );
    }

    private _x: number;
    private _y: number;
    private _magnitude: number | null = null;
    private _normalized: Vector2 | null = null;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
        this._magnitude = null;
        this._normalized = null;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
        this._magnitude = null;
        this._normalized = null;
    }

    get magnitude(): number {
        return this._magnitude === null
            ? this._magnitude = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
            : this._magnitude;
    }

    set magnitude(value: number) {
        const sqrMagnitude = Math.pow(value, 2);
        const sqrX = Math.pow(this._x, 2);
        const sqrY = Math.pow(this._y, 2);

        this.x = Math.sqrt(sqrY - sqrMagnitude);
        this.y = Math.sqrt(sqrX - sqrMagnitude);
        this._magnitude = value;
        this._normalized = null;
    }

    get normalized(): Vector2 {
        const magnitude = this.magnitude || 1;

        return this._normalized === null
            ? this._normalized = new Vector2(
                this.x / magnitude,
                this.y / magnitude
            )
            : this._normalized;
    }
}
