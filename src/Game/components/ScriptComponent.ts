import { Component } from '../../Engine/Component';
import { Class } from '../../types/Class';
import { NullScript } from '../scripts/NullScript';
import { IScript } from '../IScript';

export class ScriptComponent<T extends IScript> extends Component {
    private script: T = new NullScript() as any;

    public setScript(scriptClass: Class<T>): void {
        this.script = new scriptClass(this.getOwner());
    }

    public getScript(): T {
        return this.script;
    }
}
