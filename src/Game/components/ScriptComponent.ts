import { Component } from '../../Engine/Component';

type Script = (deltaT: DOMHighResTimeStamp) => void;

export class ScriptComponent extends Component {
    private script: Script = () => undefined;

    public setScript(script: Script): void {
        this.script = script;
    }

    public getScript(): any {
        return this.script;
    }
}
