/// <reference types="node" />
import { IDownloadOptions } from '../types/remote';
export declare function download(source: string, target: string, overrideOptions?: Partial<IDownloadOptions>): Promise<void>;
export declare function request(source: string, writeStream: NodeJS.WritableStream): Promise<void>;
