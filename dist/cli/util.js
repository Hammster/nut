"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colorette_1 = __importDefault(require("colorette"));
exports.style = colorette_1.default;
function applyStyle(msg, textStyle = {}) {
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
    return msg;
}
exports.applyStyle = applyStyle;
