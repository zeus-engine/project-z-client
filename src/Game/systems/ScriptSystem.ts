import { System } from '../../Engine/System';
import { ScriptComponent } from '../components/ScriptComponent';
import { IEntity } from '../../Engine/IEntity';

export class ScriptSystem extends System {
    update(entities: IEntity[], deltaT: DOMHighResTimeStamp) {
        entities
            .filter(entity => {
                return entity.hasComponent(ScriptComponent);
            })
            .forEach(object => {
                const scriptComponent = object.getComponent(ScriptComponent);
                const script = scriptComponent.getScript();

                script(deltaT);
            });
    }
}
