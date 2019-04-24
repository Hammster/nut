"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const archive_1 = require("./archive");
const log_1 = require("./cli/log");
const table_1 = require("./cli/table");
const util_1 = require("./cli/util");
const fs_1 = require("./fs");
const remote_1 = require("./remote");
const spinner_1 = require("./spinner");
async function createTimeout(ms) {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function test() {
    log_1.title('Test Logging');
    log_1.title('TitleText', { styles: [util_1.style.bgBlueBright, util_1.style.bold, util_1.style.underline] });
    log_1.log(`Log with ${util_1.style.red('style')}`, {
        indention: 0,
        styles: [util_1.style.yellow]
    });
    log_1.log(`Log with style and ${util_1.style.red('indention')}`, {
        indention: 1,
        styles: [util_1.style.bgGreen, util_1.style.bold, util_1.style.blue]
    });
    log_1.log(`Log with style, indention and ${util_1.style.red('padding')}`, {
        indention: 2,
        padding: true,
        styles: [util_1.style.bgBlueBright, util_1.style.white]
    });
    log_1.seperator();
    table_1.logTable([{ a: 1, b: 2 }, { a: 1 }], { columnNames: ['a', 'b'] });
    log_1.seperator();
    table_1.logTable(['c', 'd'], { textStyle: [util_1.style.green] });
    log_1.seperator();
    table_1.logTable([{ a: 1, b: 2 }, { a: 1 }], { borderStyle: [util_1.style.green] });
    log_1.title('Test Spinner');
    await spinner_1.spinWrap(createTimeout(10), '100ms');
    await spinner_1.spinWrap(createTimeout(50), '500ms');
    await spinner_1.spinWrap(createTimeout(100), '1000ms');
    log_1.title('Test Copy');
    await fs_1.copy(['../tests/**/*.js'], '../tests/assets/b');
    log_1.title('Remote');
    await spinner_1.spinWrap(remote_1.request('https://www.reddit.com/.json'), 'Grab a JSON from reddit');
    await remote_1.download('https://hans-koch.me/2018-07-23_00-24-27.mp4', '../tests/assets/my.mp4');
    log_1.title('Archive');
    await archive_1.pack('../tests/assets/my.mp4', '../ohwow.zip', 'zip');
    await archive_1.extract('../ohwow.zip', '../tests/ohwow');
}
test();
process.on('unhandledRejection', () => undefined);
