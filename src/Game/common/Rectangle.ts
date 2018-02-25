import { IShape } from '../IShape';

export class Rectangle implements IShape {
    public width: number;
    public height: number;
    public color: string = '#0f0f00';

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
