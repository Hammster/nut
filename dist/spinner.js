"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const util_1 = require("./cli/util");
const error_1 = require("./error");
const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let spinState = 0;
let spinInterval;
const hideCursor = '\u001b[?25l';
const showCursor = '\u001b[?25h';
function updateSpinner() {
    // readline.clearLine(process.stdout, 0)
    process.stdout.write(hideCursor);
    readline_1.default.cursorTo(process.stdout, 0);
    spinState = (spinState + 1) % spinner.length;
    process.stdout.write(`${util_1.style.green(spinner[spinState])}`);
}
function spinWrap(wrappedFunction, msg = 'loading') {
    process.stdout.write(`${util_1.style.green(spinner[spinState])} ${msg}`);
    spinInterval = setInterval(updateSpinner, 100);
    return new Promise((resolve, reject) => {
        /* tslint:disable:only-arrow-functions */
        wrappedFunction.then(function () {
            stopSpinner();
            readline_1.default.cursorTo(process.stdout, 0);
            process.stdout.write(`${util_1.style.green('✓')} ${msg}\n`);
            resolve(...arguments);
        }).catch((error) => {
            stopSpinner();
            readline_1.default.cursorTo(process.stdout, 0);
            process.stdout.write(`${util_1.style.red('✗')} ${msg}${showCursor}\n`);
            reject(error_1.NutError.convertFromError(error));
        });
    });
}
exports.spinWrap = spinWrap;
function stopSpinner() {
    clearInterval(spinInterval);
}
exports.stopSpinner = stopSpinner;
