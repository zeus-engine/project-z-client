import { System } from '../../Engine/System';
import { ScriptComponent } from '../components/ScriptComponent';
import { EntityManager } from '../services/EntityManager';

export class ScriptingSystem extends System {
    update(entities: EntityManager, deltaT: DOMHighResTimeStamp) {
        entities
            .filterByComponents(ScriptComponent)
            .forEach(object => {
                const scriptComponent = object.getComponent(ScriptComponent);
                const script = scriptComponent.getScript();

                try {
                    script.update(deltaT);
                } catch (error) {
                    console.error(`Unable to run script ${script.constructor.name}: ${error}`);
                }
            });
    }
}
