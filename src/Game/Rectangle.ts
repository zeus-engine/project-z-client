import { IGraphics } from './IGraphics';

export class Rectangle implements IGraphics {
    public width: number;
    public height: number;
    public color: string = '#0f0f00';

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
