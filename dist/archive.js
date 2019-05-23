"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const error_1 = require("./error");
async function extract(source, target = './') {
    if (!path_1.isAbsolute(source)) {
        source = path_1.join(__dirname, source);
    }
    if (!path_1.isAbsolute(target)) {
        target = path_1.join(__dirname, target);
    }
    await new Promise((resolve, reject) => {
        child_process_1.exec(`7z x "${source}" "-o${target}" -y`, (error, stdout, stderr) => {
            if (error) {
                reject(new error_1.NutError(error.message));
                return;
            }
            resolve(stdout.trim());
        });
    });
}
exports.extract = extract;
async function pack(source, target, archiveType = '7z') {
    const typeSwitch = `-t${archiveType}`;
    if (!path_1.isAbsolute(source)) {
        source = path_1.join(__dirname, source);
    }
    if (!path_1.isAbsolute(target)) {
        target = path_1.join(__dirname, target);
    }
    await new Promise((resolve, reject) => {
        child_process_1.exec(`7z a ${typeSwitch} ${target} ${source}`, (error, stdout, stderr) => {
            if (error) {
                reject(new error_1.NutError(error.message));
                return;
            }
            resolve(stdout.trim());
        });
    });
}
exports.pack = pack;
//# sourceMappingURL=archive.js.map