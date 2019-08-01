"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
async function glob(path, options = {}) {
    path = path.replace(/\\/g, '/');
    return new Promise((resolve, reject) => glob_1.default(path, options, (error, matches) => {
        if (error) {
            reject(error);
        }
        resolve(matches);
    }));
}
exports.glob = glob;
//# sourceMappingURL=glob.js.map