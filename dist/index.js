"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("./fs");
(async () => {
    const a = await fs_1.combineFileTreeHash('./**/*.js');
    console.log(a);
})();
__export(require("./archive"));
__export(require("./cli/log"));
__export(require("./cli/table"));
__export(require("./cli/util"));
__export(require("./child-process"));
__export(require("./fs"));
__export(require("./remote"));
__export(require("./spinner"));
__export(require("./path"));
//# sourceMappingURL=index.js.map