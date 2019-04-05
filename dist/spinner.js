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
function updateSpinner() {
    // readline.clearLine(process.stdout, 0)
    process.stdout.write('\u001b[?25l');
    readline_1.default.cursorTo(process.stdout, 0);
    spinState = (spinState + 1) % spinner.length;
    process.stdout.write(`${cli_log_1.style.green(spinner[spinState])} loading`);
}
function spinWrap(wrappedFunction) {
    spinInterval = setInterval(updateSpinner, 100);
    return new Promise((resolve, reject) => {
        /* tslint:disable:only-arrow-functions */
        wrappedFunction().then(function () {
            readline_1.default.clearLine(process.stdout, 0);
            readline_1.default.cursorTo(process.stdout, 0);
            resolve(...arguments);
        }).catch((error) => {
            readline_1.default.clearLine(process.stdout, 0);
            readline_1.default.cursorTo(process.stdout, 0);
            process.stdout.write('\n\n');
            reject(error);
        }).finally(() => {
            stopSpinner();
            process.stdout.write('\u001b[?25h');
        });
    });
}
exports.spinWrap = spinWrap;
function stopSpinner() {
    clearInterval(spinInterval);
}
exports.stopSpinner = stopSpinner;
