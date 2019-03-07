import { Component } from '../../EnginePackage/classes/Component';
import { IClass } from '../../CorePackage/interfaces/IClass';
import { NullScript } from '../scripts/NullScript';
import { IScript } from '../interfaces/IScript';

export class ScriptComponent<T extends IScript> extends Component {
    private script: T = new NullScript() as any;

    public setScript(scriptClass: IClass<T>): void {
        this.script = new scriptClass(this.getOwner());
    }

    public getScript(): T {
        return this.script;
    }
}
