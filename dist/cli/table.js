"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log");
const util_1 = require("./util");
const defaultOptions = {
    borderStyle: [],
    columnNames: [],
    tableEntryMaxWidth: 16,
    textStyle: [util_1.style.white]
};
const defaultTableStyle = {
    borderStyle: defaultOptions.borderStyle,
    columnNames: defaultOptions.columnNames,
    textStyle: defaultOptions.textStyle
};
let options = Object.assign({}, defaultOptions);
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
    tabelHorizontal = TableChars.HorizontalLine.repeat(options.tableEntryMaxWidth);
    safeStringLength = options.tableEntryMaxWidth - 3;
}
function logTable(data = [], overloadTableStyle = {}) {
    const tableStyle = Object.assign({}, defaultTableStyle, overloadTableStyle);
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
    let cellCount = tableStyle.columnNames.length;
    if (cellCount === 0) {
        tableStyle.columnNames = Object.keys(workingData.reduce((result, obj) => {
            return Object.assign(result, obj);
        }, {}));
        cellCount = tableStyle.columnNames.length;
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
        makeCells(tableStyle.columnNames);
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
        if (tableStyle.columnNames === cellData) {
            isHead = true;
            cellData = tableStyle.columnNames.reduce((accumulator, currentValue) => {
                accumulator[currentValue] = currentValue;
                return accumulator;
            }, {});
        }
        tableStyle.columnNames.forEach((columnProperty) => {
            const val = cellData[columnProperty] || '';
            const text = val.toString();
            const fillchar = text.length >= safeStringLength ? '.' : ' ';
            table += TableChars.VerticalLine;
            const formatted = text.substring(0, safeStringLength).padEnd(options.tableEntryMaxWidth, fillchar);
            // tslint:disable-next-line:max-line-length
            table += isHead ? util_1.applyStyle(formatted, { styles: [util_1.style.bgWhite, util_1.style.black] }) : util_1.applyStyle(formatted, { styles: tableStyle.textStyle });
        });
        table += TableChars.VerticalLine + '\n';
    }
    log_1.log(table, { styles: tableStyle.borderStyle });
}
exports.logTable = logTable;
