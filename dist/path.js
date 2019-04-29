"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
exports.PROJECT_ROOT = path_1.dirname(require.main.filename || process.mainModule.filename);
function pathFromRoot(path = './') {
    return path_1.join(exports.PROJECT_ROOT, path);
}
exports.pathFromRoot = pathFromRoot;
