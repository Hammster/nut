"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tiny_glob_1 = __importDefault(require("tiny-glob"));
const log_1 = require("./cli/log");
const error_1 = require("./error");
const spinner_1 = require("./spinner");
const defaultOptions = {
    cwd: __dirname,
    flat: false,
    verbose: false
};
let options = Object.assign({}, defaultOptions);
function setOption(overrideOptions = {}) {
    options = Object.assign({}, options, overrideOptions);
}
exports.setOption = setOption;
async function copy(sources, target, overrideOptions = {}) {
    if (Object.keys(overrideOptions).length !== 0) {
        setOption(overrideOptions);
    }
    if (!path_1.default.isAbsolute(target)) {
        target = path_1.default.join(options.cwd, target);
    }
    if (fs_1.default.existsSync(target)) {
        log_1.log(`globs:\t ${sources}`);
        log_1.log(`target:\t ${target}`);
        log_1.log(`options:\n${JSON.stringify(options, undefined, 2)}\n`);
        for (const source of sources) {
            const result = await spinner_1.spinWrap(tiny_glob_1.default(source, { cwd: options.cwd }), `copy: ${source}`);
            for (const resultItem of result) {
                const newRelativePath = options.flat ? path_1.default.basename(resultItem) : resultItem;
                const contextSource = path_1.default.join(options.cwd, resultItem);
                const contextTarget = path_1.default.join(target, newRelativePath);
                const contextTargetFolder = path_1.default.dirname(contextTarget);
                if (!fs_1.default.existsSync(contextTargetFolder)) {
                    fs_1.default.mkdirSync(contextTargetFolder, { recursive: true });
                }
                fs_1.default.copyFileSync(contextSource, contextTarget);
            }
        }
    }
    else {
        throw new error_1.NutError(`Target does not exist ${target}`);
    }
}
exports.copy = copy;
// @TODO: delete, move
