"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_glob_1 = __importDefault(require("tiny-glob"));
async function glob(path, options = {}) {
    path = path.replace(/\\/g, '/');
    return tiny_glob_1.default(path, options);
}
exports.glob = glob;
//# sourceMappingURL=glob.js.map