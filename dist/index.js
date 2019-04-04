"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultOptions = {
    seperatorCharacter: '─',
    seperatorLength: 20
};
const options = Object.assign({}, defaultOptions);
const seperator = options.seperatorCharacter.repeat(20);
function title(msg) {
    log(seperator);
}
function log(msg, textStyle = {}) {
    // tslint:disable-next-line:no-console
    console.log(msg);
}
