import { Component } from '../../EnginePackage/classes/Component';
import { IShape } from '../interfaces/IShape';
import { NullShape } from '../classes/NullShape';

export class ShapeRendererComponent extends Component {
    private shape: IShape = new NullShape();

    public setShape(shape: IShape): void {
        this.shape = shape;
    }

    public getShape(): IShape {
        return this.shape;
    }
}
