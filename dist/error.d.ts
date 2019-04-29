export declare function catchUnhandledRejections(): void;
export declare function handleError(error: Error): void;
export declare class NutError extends Error {
    static convertFromError(error: Error): NutError;
    constructor(message: string, stack?: string);
    private printError;
    private printStackTrace;
}
