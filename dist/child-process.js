"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const error_1 = require("./error");
function spawn(command, args = []) {
    return new Promise((resolve, reject) => {
        const child = child_process_1.default.spawn(command, args, { stdio: 'inherit' });
        child.on('close', (code, signal) => {
            if (code !== 0) {
                reject(new error_1.NutError('spawn failed'));
            }
            resolve(code);
        });
    });
}
exports.spawn = spawn;
//# sourceMappingURL=child-process.js.map