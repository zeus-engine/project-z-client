export class Defer<T> {
    public readonly promise: Promise<T>;
    public resolve: (data: T) => void = () => undefined;
    public reject: (reason: any) => void = () => undefined;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
