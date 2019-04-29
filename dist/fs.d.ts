import { ICopyOptions } from '../types/fs';
export declare function copy(sources: string[], target: string, overrideOptions?: Partial<ICopyOptions>): Promise<void>;
