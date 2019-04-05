"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const tiny_glob_1 = __importDefault(require("tiny-glob"));
const cli_log_1 = require("./cli-log");
const error_1 = require("./error");
const spinner_1 = require("./spinner");
function copy(sources, target) {
    if (!path_1.default.isAbsolute(target)) {
        target = path_1.default.join(__dirname, target);
    }
    if (fs_1.default.existsSync(target)) {
        cli_log_1.log(`Copy to ${target}`);
        sources.forEach(async (source) => {
            spinner_1.spinWrap(() => {
                return tiny_glob_1.default(source);
            }).then((result) => {
                /* tslint:disable */
                console.log(result);
            });
        });
    }
    else {
        throw new error_1.NutError(`Target does not exist (${target})`);
    }
}
exports.copy = copy;
