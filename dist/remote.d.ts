/// <reference types="node" />
import { IDownloadOptions } from '../types/remote';
export declare function download(source: string | URL, target: string, overrideOptions?: Partial<IDownloadOptions>): Promise<void>;
export declare function request(source: string | URL, writeStream?: NodeJS.WritableStream): Promise<{}>;
