import { Vector2 } from './Vector2';

class Rect {
    public a: Vector2;
    public b: Vector2;

    constructor(a: Vector2, b: Vector2) {
        this.a = a;
        this.b = b;
    }

    public contains(point: Vector2): boolean {
        return (
            point.x < this.a.x ||
            point.y < this.a.y ||
            point.x > this.b.x ||
            point.y > this.b.y
        ) === false;
    }

    public intersect(a: Vector2, b: Vector2): boolean {
        return (
            b.x < this.a.x ||
            b.y < this.a.y ||
            a.x > this.b.x ||
            a.y > this.b.y
        ) === false;
    }
}

type Data<T> = {
    point: Vector2;
    payload: T
};

export class QuadTree<T> {
    private readonly CAPACITY = 4;

    private boundary: Rect;
    private parent: QuadTree<T> | null = null;
    private northWest: QuadTree<T> | null = null;
    private northEast: QuadTree<T> | null = null;
    private southWest: QuadTree<T> | null = null;
    private southEast: QuadTree<T> | null = null;
    private storage: Data<T>[] = [];
    private divided: boolean = false;
    private level: number = 0;
    private position: string = 'root';

    constructor(A: Vector2, B: Vector2, parent?: QuadTree<T>) {
        this.boundary = new Rect(A, B);
        this.parent = parent !== undefined ? parent : null;
        this.level = parent !== undefined ? parent.level + 1 : 0;
    }

    public insert(point: Vector2, data: T): boolean {
        if (this.boundary.contains(point) === false) {
            return false;
        }

        if (
            this.divided === false &&
            this.storage.length < this.CAPACITY
        ) {
            this.storage.push({
                point: point,
                payload: data
            });

            return true;
        }

        if (this.divided === false) {
            this.divide();

            this.storage.forEach(item => (
                this.northEast !== null && this.northEast.insert(item.point, item.payload) ||
                this.northWest !== null && this.northWest.insert(item.point, item.payload) ||
                this.southWest !== null && this.southWest.insert(item.point, item.payload) ||
                this.southEast !== null && this.southEast.insert(item.point, item.payload)
            ));

            this.storage = [];
        }

        return (
            this.northEast !== null && this.northEast.insert(point, data) ||
            this.northWest !== null && this.northWest.insert(point, data) ||
            this.southWest !== null && this.southWest.insert(point, data) ||
            this.southEast !== null && this.southEast.insert(point, data)
        );
    }

    public findInRange(a: Vector2, b: Vector2): T[] {
        const range = new Rect(a, b);

        if (this.boundary.intersect(a, b) === false) {
            return [];
        }

        const result = this.storage
            .filter(data => range.contains(data.point))
            .map(data => data.payload);

        if (this.divided === false) {
            return result;
        }

        this.northWest !== null && result.push(...this.northWest.findInRange(a, b));
        this.northEast !== null && result.push(...this.northEast.findInRange(a, b));
        this.southWest !== null && result.push(...this.southWest.findInRange(a, b));
        this.southEast !== null && result.push(...this.southEast.findInRange(a, b));

        return result;
    }

    /*
    * this method has a public descriptor only for the debug purposes
    */
    public render(context: CanvasRenderingContext2D, pixelsPerUnit: number): void {
        const width = Math.abs(this.boundary.b.x - this.boundary.a.x) * pixelsPerUnit;
        const height = Math.abs(this.boundary.b.y - this.boundary.a.y) * pixelsPerUnit;

        context.strokeStyle = `hsl(${20 * this.level}, 65%, 50%)`;

        context.strokeRect(
            Math.round(this.boundary.a.x * pixelsPerUnit) + 0.5,
            Math.round(this.boundary.a.y * pixelsPerUnit) + 0.5,
            Math.round(width),
            Math.round(height)
        );

        if (this.divided === false) {
            return;
        }

        [
            this.northWest,
            this.northEast,
            this.southWest,
            this.southEast
        ]
            .forEach(child => {
                if (child != null) {
                    child.render(context, pixelsPerUnit);
                }
            });
    }

    private divide(): void {
        const center = new Vector2(
            (this.boundary.a.x + this.boundary.b.x) * 0.5,
            (this.boundary.a.y + this.boundary.b.y) * 0.5
        );
        const west = new Vector2(this.boundary.a.x, center.y);
        const east = new Vector2(this.boundary.b.x, center.y);
        const north = new Vector2(center.x, this.boundary.a.y);
        const south = new Vector2(center.x, this.boundary.b.y);

        this.northWest = new QuadTree<T>(this.boundary.a, center, this);
        this.northEast = new QuadTree<T>(north, east, this);
        this.southWest = new QuadTree<T>(west, south, this);
        this.southEast = new QuadTree<T>(center, this.boundary.b, this);

        this.northWest.position = 'NW';
        this.northEast.position = 'NE';
        this.southWest.position = 'SW';
        this.southEast.position = 'SE';
        this.divided = true;
    }
}
