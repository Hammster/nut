"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const defaultOptions = {
    seperatorCharacter: '─',
    seperatorLength: 80,
    tableEntryMaxWidth: 16
};
let options = { ...defaultOptions };
let seperatorString = '';
setOption();
function setOption(overrideOptions = {}) {
    options = { ...options, ...overrideOptions };
    seperatorString = options.seperatorCharacter.repeat(options.seperatorLength);
}
function title(msg, textStyle = {}, seperatorStyle = {}) {
    msg = ` ${msg} `;
    const seperatorStart = seperatorString.slice(0, 4);
    const seperatorEnd = seperatorString.slice(4, seperatorString.length - msg.length);
    const seperatorUnion = util_1.applyStyle(seperatorStart, seperatorStyle)
        + util_1.applyStyle(msg, textStyle)
        + util_1.applyStyle(seperatorEnd, seperatorStyle);
    log(`\n${seperatorUnion}`);
}
exports.title = title;
function log(msg, textStyle = {}) {
    msg = msg.toString();
    // tslint:disable-next-line:no-console
    console.log(util_1.applyStyle(msg, textStyle) + util_1.style.reset(''));
}
exports.log = log;
function seperator(textStyle = {}) {
    log(seperatorString, textStyle);
}
exports.seperator = seperator;
