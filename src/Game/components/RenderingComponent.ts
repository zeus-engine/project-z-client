import { Component } from '../../Engine/Component';
import { IGraphics } from '../IGraphics';
import { Entity } from '../../Engine/Entity';
import { NullGraphics } from '../NullGraphics';

export class RenderingComponent extends Component {
    private graphics: IGraphics = NullGraphics;

    public setGraphics(graphics: IGraphics): void {
        this.graphics = graphics;
    }

    public getGraphics(): IGraphics {
        return this.graphics
    }
}
