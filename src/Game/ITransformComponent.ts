import { IComponent } from '../Engine/IComponent';
import { Vector2 } from './common/Vector2';

export interface ITransformComponent extends IComponent {
    position: Vector2;
}
