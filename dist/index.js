"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_log_1 = require("./cli-log");
const copy_1 = require("./copy");
const spinner_1 = require("./spinner");
async function createTimeout(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function test() {
    cli_log_1.title('Test Logging');
    cli_log_1.title('- Title', { styles: [cli_log_1.style.bgRed, cli_log_1.style.bold, cli_log_1.style.underline] });
    cli_log_1.log('- Log', { styles: [cli_log_1.style.bgBlue, cli_log_1.style.italic, cli_log_1.style.yellow] });
    cli_log_1.title('Test Spinner');
    await spinner_1.spinWrap(createTimeout(500));
    await spinner_1.spinWrap(createTimeout(100));
    await spinner_1.spinWrap(createTimeout(1500));
    await spinner_1.spinWrap(createTimeout(5000));
    cli_log_1.title('Test Copy');
    copy_1.copy(['./tests/assets/a/o*.js'], './tests/assets/b');
}
test().then(() => {
    cli_log_1.log('done');
});
