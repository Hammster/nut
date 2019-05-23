"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const stream_1 = require("stream");
const util_1 = require("util");
const defaultOptions = {};
const pipe = util_1.promisify(stream_1.pipeline);
let options = { ...defaultOptions };
function setOption(overrideOptions = {}) {
    options = { ...options, ...overrideOptions };
}
async function download(source, target, overrideOptions = {}) {
    if (Object.keys(overrideOptions).length !== 0) {
        setOption(overrideOptions);
    }
    const fileWriteStream = fs_1.default.createWriteStream(target);
    await request(source, fileWriteStream);
}
exports.download = download;
async function request(source, writeStream) {
    const res = await node_fetch_1.default(source);
    await new Promise((resolve, reject) => {
        res.body.pipe(writeStream);
        res.body.on('error', (err) => {
            reject(err);
        });
        writeStream.on('finish', () => {
            resolve();
        });
    });
}
exports.request = request;
//# sourceMappingURL=remote.js.map