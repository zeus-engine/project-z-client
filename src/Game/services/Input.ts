export class Input {
    private keys: DOMString[] = [];

    constructor() {
        this.keyDownListener = this.keyDownListener.bind(this);
        this.keyUpListener = this.keyUpListener.bind(this);

        window.addEventListener('keydown', this.keyDownListener);
        window.addEventListener('keyup', this.keyUpListener);
    }

    public isPressed(key: DOMString): boolean {
        return this.keys.includes(key);
    }

    private keyDownListener(event: KeyboardEvent): void {
        this.keys.push(event.key);
    }

    private keyUpListener(event: KeyboardEvent): void {
        this.keys = this.keys.filter(key => key !== event.key);
    }
}
