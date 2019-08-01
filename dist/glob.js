"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tiny_glob_1 = __importDefault(require("tiny-glob"));
const os_1 = require("./os");
async function glob(path, options = {}) {
    path = path.replace(/\\/g, '/');
    const globReturn = tiny_glob_1.default(path, options)
        .then((pathMap) => {
        if (os_1.isMac && options.absolute) {
            pathMap.map((pathItem) => {
                if (pathItem.charAt(0) !== '/') {
                    return `/${pathItem}`;
                }
                return pathItem;
            });
        }
        return pathMap;
    });
    return globReturn;
}
exports.glob = glob;
//# sourceMappingURL=glob.js.map