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
let options = Object.assign({}, defaultOptions);
function setOption(overrideOptions = {}) {
    options = Object.assign({}, options, overrideOptions);
}
exports.setOption = setOption;
async function download(source, target, overrideOptions = {}) {
    if (Object.keys(overrideOptions).length !== 0) {
        setOption(overrideOptions);
    }
    const pipe = util_1.promisify(stream_1.pipeline);
    const fstream = fs_1.default.createWriteStream(path_1.default.join(__dirname, target));
    let maxRedirect = 3;
    const getRequest = () => new Promise(async (resolve, reject) => {
        https_1.default.get(source, async (response) => {
            switch (response.statusCode) {
                // Pipe the stream into the file
                case 200:
                    await pipe(response, fstream);
                    resolve();
                    break;
                // Follow the redirect or throw errow
                case 302:
                    maxRedirect--;
                    source = new URL('', response.headers.location);
                    if (maxRedirect > 0) {
                        await getRequest();
                    }
                    else {
                        fstream.close();
                        fs_1.default.unlink(target, (error) => { throw error; });
                        reject(new error_1.NutError('Max Redirect count (3) was reached'));
                    }
                    break;
                // Unhandled scenario
                default:
                    fstream.close();
                    fs_1.default.unlink(target, (error) => { throw error; });
                    reject(new error_1.NutError(`Server responded with ${response.statusCode}: ${response.statusMessage}`));
                    break;
            }
        });
    });
    await spinner_1.spinWrap(getRequest(), `download: ${source}`);
}
exports.download = download;
