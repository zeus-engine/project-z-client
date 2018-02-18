import { Component } from '../../Engine/Component';

export class CameraComponent extends Component {
    public target: HTMLCanvasElement = document.createElement('canvas');
}
