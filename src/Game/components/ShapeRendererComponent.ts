import { Component } from '../../Engine/Component';
import { IShape } from '../IShape';
import { NullShape } from '../common/NullShape';

export class ShapeRendererComponent extends Component {
    private shape: IShape = new NullShape();

    public setShape(shape: IShape): void {
        this.shape = shape;
    }

    public getShape(): IShape {
        return this.shape;
    }
}
