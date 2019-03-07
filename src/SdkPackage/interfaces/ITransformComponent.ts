import { IComponent } from '../../EnginePackage/interfaces/IComponent';
import { Vector2 } from '../classes/Vector2';

export interface ITransformComponent extends IComponent {
    position: Vector2;
    scale: Vector2;
}
