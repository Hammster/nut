"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_1 = require("./error");
const glob_1 = require("./glob");
const defaultOptions = {
    cwd: '.',
    flat: false,
    verbose: false
};
let options = { ...defaultOptions };
function setOption(overrideOptions = {}) {
    options = { ...options, ...overrideOptions };
}
async function copyGlob(sources, target, overrideOptions = {}) {
    if (Object.keys(overrideOptions).length !== 0) {
        setOption(overrideOptions);
    }
    if (!path_1.default.isAbsolute(target)) {
        target = path_1.default.join(options.cwd, target);
    }
    if (!fs_1.default.existsSync(target)) {
        fs_1.default.mkdirSync(target, { recursive: true });
    }
    for (const source of sources) {
        const result = await glob_1.glob(source, { absolute: true });
        for (const resultItem of result) {
            const contextSource = path_1.default.join(options.cwd, resultItem);
            const contextTarget = options.flat ? path_1.default.basename(resultItem) : path_1.default.relative(options.cwd, resultItem);
            const contextTargetAbsolute = path_1.default.join(target, contextTarget);
            const contextTargetFolder = path_1.default.dirname(contextTargetAbsolute);
            if (!fs_1.default.existsSync(contextTargetFolder)) {
                fs_1.default.mkdirSync(contextTargetFolder, { recursive: true });
            }
            fs_1.default.copyFileSync(contextSource, contextTargetAbsolute);
        }
    }
}
exports.copyGlob = copyGlob;
async function fileHash(filePath) {
    const bufferList = [];
    let absFilePath = path_1.default.join(options.cwd, filePath);
    // UC first latter on unix '/' keeps '/' on windows the drive latter will be capitalized
    absFilePath = absFilePath.charAt(0).toUpperCase() + absFilePath.slice(1);
    if (fs_1.default.existsSync(absFilePath)) {
        const stat = await fs_1.default.promises.lstat(absFilePath);
        if (stat.isFile()) {
            bufferList.push(Buffer.from(absFilePath));
            bufferList.push(fs_1.default.readFileSync(absFilePath));
        }
        else {
            throw new error_1.NutError('Given filepath is not a file');
        }
        const resultBuffer = Buffer.concat(bufferList);
        const hash = crypto_1.default.createHash('sha1');
        return hash.update(resultBuffer).digest('base64');
    }
    else {
        throw new error_1.NutError('Given filepath does not exist');
    }
}
exports.fileHash = fileHash;
async function combineFileTreeHash(globData) {
    const paths = await glob_1.glob(globData, { absolute: true });
    const bufferList = [];
    for (let element of paths) {
        element = path_1.default.join(options.cwd, element);
        // UC first latter on unix '/' keeps '/' on windows the drive latter will be capitalized
        element = element.charAt(0).toUpperCase() + element.slice(1);
        const stat = await fs_1.default.promises.lstat(element);
        if (stat.isFile()) {
            bufferList.push(Buffer.from(element));
            bufferList.push(fs_1.default.readFileSync(element));
        }
        else {
            bufferList.push(Buffer.from(element));
        }
    }
    const resultBuffer = Buffer.concat(bufferList);
    const hash = crypto_1.default.createHash('sha1');
    return hash.update(resultBuffer).digest('base64');
}
exports.combineFileTreeHash = combineFileTreeHash;
var fs_extra_1 = require("fs-extra");
exports.copy = fs_extra_1.copy;
exports.move = fs_extra_1.move;
exports.outputFile = fs_extra_1.outputFile;
exports.readFile = fs_extra_1.readFile;
exports.readJson = fs_extra_1.readJson;
exports.writeJson = fs_extra_1.writeJson;
exports.ensureDir = fs_extra_1.ensureDir;
//# sourceMappingURL=fs.js.map