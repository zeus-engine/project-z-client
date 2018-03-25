import { ImmutableVector2 } from './ImmutableVector2';

type LerpInterpolant = number; // 0 <= x <= 1

export class Vector2 extends ImmutableVector2 {
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

    public get x(): number {
        return super.x;
    }

    public set x(value: number) {
        this._x = value;
        this._magnitude = null;
        this._normalized = null;
    }

    public get y(): number {
        return super.y;
    }

    public set y(value: number) {
        this._y = value;
        this._magnitude = null;
        this._normalized = null;
    }

    public get magnitude(): number {
        return super.magnitude;
    }

    public set magnitude(value: number) {
        const sqrMagnitude = Math.pow(value, 2);
        const sqrX = Math.pow(this._x, 2);
        const sqrY = Math.pow(this._y, 2);

        this.x = Math.sqrt(sqrY - sqrMagnitude);
        this.y = Math.sqrt(sqrX - sqrMagnitude);
        this._magnitude = value;
        this._normalized = null;
    }

    public get normalized(): Vector2 {
        return super.normalized;
    }
}
