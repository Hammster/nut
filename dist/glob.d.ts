interface IGlobOptions {
    cwd?: string;
    dot?: boolean;
    absolute?: boolean;
    filesOnly?: boolean;
}
export declare function glob(path: string, options?: IGlobOptions): Promise<string[]>;
export {};
