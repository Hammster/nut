"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kleur_1 = __importDefault(require("kleur"));
exports.style = kleur_1.default;
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
    console.log(msg + kleur_1.default.reset(''));
}
exports.log = log;
