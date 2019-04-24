"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const util_1 = require("util");
const error_1 = require("./error");
const spinner_1 = require("./spinner");
const defaultOptions = {};
const pipe = util_1.promisify(stream_1.pipeline);
let options = Object.assign({}, defaultOptions);
function setOption(overrideOptions = {}) {
    options = Object.assign({}, options, overrideOptions);
}
exports.setOption = setOption;
async function download(source, target, overrideOptions = {}) {
    if (Object.keys(overrideOptions).length !== 0) {
        setOption(overrideOptions);
    }
    const fileWriteStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, target));
    await spinner_1.spinWrap(request(source, fileWriteStream), `download: ${source}`);
}
exports.download = download;
async function request(source, writeStream) {
    let maxRedirect = 3;
    let chunkedData = '';
    return new Promise(async (resolve, reject) => {
        https_1.default.get(source, async (response) => {
            switch (response.statusCode) {
                // Pipe the stream into the file
                case 200:
                    if (writeStream) {
                        await pipe(response, writeStream);
                        resolve();
                    }
                    else {
                        response.on('data', (data) => {
                            chunkedData += data;
                        });
                        response.on('end', () => {
                            resolve(chunkedData);
                        });
                        response.on('error', (error) => {
                            resolve(error_1.NutError.convertFromError(error));
                        });
                    }
                    break;
                // Follow the redirect or throw errow
                case 302:
                    maxRedirect--;
                    source = new URL('', response.headers.location);
                    if (maxRedirect > 0) {
                        await request(source, writeStream);
                    }
                    else {
                        reject(new error_1.NutError('Max Redirect count (3) was reached'));
                    }
                    break;
                // Unhandled scenario
                default:
                    reject(new error_1.NutError(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
                    break;
            }
        });
    });
}
exports.request = request;
