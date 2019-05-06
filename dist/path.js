"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const mainFile = require.main !== undefined ? require.main.filename : null;
const mainModule = process.mainModule !== undefined ? process.mainModule.filename : null;
exports.PROJECT_ROOT = path_1.dirname(mainFile || mainModule || './package.json');
function pathFromRoot(path = './') {
    return path_1.join(exports.PROJECT_ROOT, path);
}
exports.pathFromRoot = pathFromRoot;
//# sourceMappingURL=path.js.map