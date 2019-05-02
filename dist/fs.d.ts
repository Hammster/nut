import { ICopyOptions } from '../types/fs';
export declare function copy(sources: string[], target: string, overrideOptions?: Partial<ICopyOptions>): Promise<void>;
export declare function fileHash(filePath: string): Promise<string>;
export declare function combineFileTreeHash(globData: string): Promise<string>;
