import { Vector2 } from './Vector2';

export class Sprite {
    public pivot: Vector2 = new Vector2(0.5, 0.5);
    private _factor: Vector2 = new Vector2(0, 0);
    private _pixelsPerUnit: number = 100;
    private _texture: ImageBitmap | null = null;

    public get texture(): ImageBitmap | null {
        return this._texture;
    }

    public set texture(texture: ImageBitmap | null) {
        this._texture = texture;

        this.recalculateFactor();
    }

    public get pixelsPerUnit(): number {
        return this._pixelsPerUnit;
    }

    public set pixelsPerUnit(ppu: number) {
        this._pixelsPerUnit = ppu;

        this.recalculateFactor();
    }

    public get factor(): Vector2 {
        return this._factor;
    }

    private recalculateFactor(): void {
        if (
            this._texture === null ||
            this.pixelsPerUnit === 0
        ) {
            this._factor = new Vector2(0, 0);

            return;
        }

        this._factor = new Vector2(
            this._texture.width / this._pixelsPerUnit,
            this._texture.height / this._pixelsPerUnit
        );
    }
}
