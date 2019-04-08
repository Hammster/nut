"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const cli_log_1 = require("./cli-log");
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
    process.stdout.write(`${cli_log_1.style.green(spinner[spinState])} loading`);
}
function spinWrap(wrappedFunction) {
    spinInterval = setInterval(updateSpinner, 100);
    return new Promise((resolve, reject) => {
        /* tslint:disable:only-arrow-functions */
        wrappedFunction.then(function () {
            stopSpinner();
            process.stdout.write(`${cli_log_1.style.green('✓')} done${showCursor}\n`);
            resolve(...arguments);
        }).catch((error) => {
            stopSpinner();
            process.stdout.write(`${cli_log_1.style.red('✗')} error${showCursor}\n${error}`);
            reject(error);
        });
    });
}
exports.spinWrap = spinWrap;
function stopSpinner() {
    clearInterval(spinInterval);
    readline_1.default.clearLine(process.stdout, 0);
    readline_1.default.cursorTo(process.stdout, 0);
}
exports.stopSpinner = stopSpinner;
