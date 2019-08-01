"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDevelopmentMode = process.env.NODE_ENV === 'development';
exports.isProductionMode = process.env.NODE_ENV === 'production';
exports.isMac = process.platform === 'darwin';
exports.isLinux = process.platform === 'linux';
exports.isWindows = process.platform === 'win32';
exports.isUnix = exports.isMac || exports.isLinux;
//# sourceMappingURL=os.js.map