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
    seperatorLength: 80,
    tableEntryMaxWidth: 16
};
let options = Object.assign({}, defaultOptions);
let seperatorString = '';
let tabelHorizontal = '';
let safeStringLength = 0;
var TableChars;
(function (TableChars) {
    TableChars["HeadStart"] = "\u250C";
    TableChars["HeadEnd"] = "\u2510";
    TableChars["RowStart"] = "\u251C";
    TableChars["RowEnd"] = "\u2524";
    TableChars["FooterStart"] = "\u2514";
    TableChars["FooterEnd"] = "\u2518";
    TableChars["HorizontalLine"] = "\u2500";
    TableChars["VerticalLine"] = "\u2502";
    TableChars["JoinDown"] = "\u252C";
    TableChars["JoinUp"] = "\u2534";
    TableChars["JoinLeft"] = "\u2524";
    TableChars["JoinRight"] = "\u251C";
    TableChars["Join"] = "\u253C";
})(TableChars || (TableChars = {}));
setOption();
function setOption(overrideOptions = {}) {
    options = Object.assign({}, options, overrideOptions);
    seperatorString = options.seperatorCharacter.repeat(options.seperatorLength);
    tabelHorizontal = TableChars.HorizontalLine.repeat(options.tableEntryMaxWidth);
    safeStringLength = options.tableEntryMaxWidth - 3;
}
exports.setOption = setOption;
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
function title(msg, textStyle = {}) {
    msg = ` ${msg} `;
    const seperatorStart = seperatorString.slice(0, 4);
    const seperatorEnd = seperatorString.slice(4, seperatorString.length - msg.length);
    const seperatorUnion = seperatorStart + applyStyle(msg, textStyle) + seperatorEnd;
    log(`\n${seperatorUnion}`);
}
exports.title = title;
function log(msg, textStyle = {}) {
    // tslint:disable-next-line:no-console
    console.log(applyStyle(msg, textStyle) + colorette_1.reset(''));
}
exports.log = log;
function seperator(textStyle = {}) {
    log(seperatorString, textStyle);
}
exports.seperator = seperator;
// tslint:disable-next-line:max-line-length
function logTable(data = [], headerData = [], textStyle = {}, borderStyle = {}) {
    let workingData;
    if (data instanceof Set) {
        workingData = [...data];
    }
    else if (data instanceof Map) {
        workingData = [...data.values()];
    }
    else {
        workingData = data;
    }
    const rowCount = workingData.length;
    let cellCount = headerData.length;
    if (cellCount === 0) {
        headerData = Object.keys(workingData.reduce((result, obj) => {
            return Object.assign(result, obj);
        }, {}));
        cellCount = headerData.length;
    }
    const trimedCellCount = cellCount > 0 ? cellCount - 1 : 0;
    let table = '';
    makeHeader();
    workingData.forEach((dataRow, index) => {
        makeRow();
        makeCells(dataRow);
        if (index === workingData.length - 1) {
            makeFooter();
        }
    });
    function makeHeader() {
        table += TableChars.HeadStart + tabelHorizontal;
        table += (TableChars.JoinDown + tabelHorizontal).repeat(trimedCellCount) + TableChars.HeadEnd + '\n';
        makeCells(headerData);
    }
    function makeRow() {
        table += TableChars.JoinRight + tabelHorizontal;
        table += (TableChars.Join + tabelHorizontal).repeat(trimedCellCount) + TableChars.JoinLeft + '\n';
    }
    function makeFooter() {
        table += TableChars.FooterStart + tabelHorizontal;
        table += (TableChars.JoinUp + tabelHorizontal).repeat(trimedCellCount) + TableChars.FooterEnd + '\n';
    }
    function makeCells(cellData) {
        let isHead = false;
        if (headerData === cellData) {
            isHead = true;
            cellData = headerData.reduce((accumulator, currentValue) => {
                accumulator[currentValue] = currentValue;
                return accumulator;
            }, {});
        }
        headerData.forEach((columnProperty) => {
            const val = cellData[columnProperty] || '';
            const text = val.toString();
            const fillchar = text.length >= safeStringLength ? '.' : ' ';
            table += TableChars.VerticalLine;
            const formatted = text.substring(0, safeStringLength).padEnd(options.tableEntryMaxWidth, fillchar);
            // tslint:disable-next-line:max-line-length
            table += isHead ? applyStyle(formatted, { styles: [colorette_1.default.bgWhite, colorette_1.default.black] }) : applyStyle(formatted, { styles: [colorette_1.default.white] });
        });
        table += TableChars.VerticalLine + '\n';
    }
    log(table, borderStyle);
}
exports.logTable = logTable;
