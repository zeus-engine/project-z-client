import { Component } from '../../Engine/Component';
import { IGraphics } from '../IGraphics';
import { NullGraphics } from '../common/NullGraphics';

export class RenderingComponent extends Component {
    private graphics: IGraphics = new NullGraphics();

    public setGraphics(graphics: IGraphics): void {
        this.graphics = graphics;
    }

    public getGraphics(): IGraphics {
        return this.graphics;
    }
}
