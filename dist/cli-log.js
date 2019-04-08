"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = __importStar(require("colorette"));
exports.style = colorette_1.default;
const defaultOptions = {
    seperatorCharacter: '─',
    seperatorLength: 80
};
let options = Object.assign({}, defaultOptions);
let seperator = '';
updateSeperator();
function updateSeperator() {
    seperator = options.seperatorCharacter.repeat(options.seperatorLength);
}
function setOption(overrideOptions) {
    options = Object.assign({}, options, overrideOptions);
    updateSeperator();
}
exports.setOption = setOption;
function title(msg, textStyle = {}) {
    log(msg, textStyle);
    log(seperator);
}
exports.title = title;
function log(msg, textStyle = {}) {
    if (textStyle.padding) {
        msg = ` ${msg} `;
    }
    if (textStyle.indention) {
        msg = `${'\t'.repeat(textStyle.indention)}${msg}`;
    }
    if (textStyle.styles) {
        textStyle.styles.forEach((styleFunction) => {
            msg = styleFunction(msg);
        });
    }
    // kleur has a issue with bgRed to prevent that we always reset after logging
    // tslint:disable-next-line:no-console
    console.log(msg + colorette_1.reset(''));
}
exports.log = log;
