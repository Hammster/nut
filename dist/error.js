"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const log_1 = require("./cli/log");
const util_1 = require("./cli/util");
function catchUnhandledRejections() {
    process.on('unhandledRejection', (error, promise) => {
        if (error instanceof NutError) {
            throw error;
        }
        else if (error instanceof Error) {
            throw NutError.convertFromError(error);
        }
        else {
            throw new NutError('');
        }
    });
}
exports.catchUnhandledRejections = catchUnhandledRejections;
function handleError(error) {
    throw NutError.convertFromError(error);
}
exports.handleError = handleError;
class NutError extends Error {
    static convertFromError(error) {
        return new NutError(error.message, error.stack);
    }
    constructor(message, stack) {
        super(message);
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
        Error.prepareStackTrace = this.printStackTrace;
        // output the error
        this.printError();
    }
    printError() {
        log_1.title('Error', { styles: [util_1.style.bgRed] });
        log_1.log(`\n${this.message}`, { styles: [util_1.style.red] });
    }
    printStackTrace(_err, stackTraces) {
        log_1.title('Stacktrace');
        // line break
        log_1.log('');
        stackTraces.forEach((trace, index) => {
            const native = util_1.applyStyle(`${trace.isNative() ? 'Native' : 'Script'}`, {
                padding: true,
                styles: [util_1.style.yellow, util_1.style.magentaBright]
            });
            const columnNumber = trace.getColumnNumber() || 0;
            const lineNumber = trace.getLineNumber() || 0;
            const fileName = trace.getFileName();
            let content = `\n`;
            if (fileName) {
                // this will flood the memory, node 11.7+ allows for better handling with
                // readline.createInterface await and for await
                const fileLines = fs_1.default.readFileSync(fileName, 'utf-8').split('\n');
                let currentLineIndex = (lineNumber >= 4 ? lineNumber - 4 : 0);
                for (currentLineIndex; currentLineIndex <= (lineNumber + 2); currentLineIndex++) {
                    let currentLine = fileLines[currentLineIndex];
                    const currentLineStyled = util_1.applyStyle(currentLineIndex.toString().padStart(6, ' '), {
                        styles: [lineNumber - 1 === currentLineIndex ? util_1.style.yellow : util_1.style.gray]
                    });
                    if (lineNumber - 1 === currentLineIndex) {
                        const markercolor = [index === 0 ? util_1.style.bgRedBright : util_1.style.bgMagenta];
                        currentLine = currentLine.substr(0, columnNumber - 1)
                            + util_1.applyStyle(currentLine.charAt(columnNumber - 1), { styles: markercolor })
                            + util_1.applyStyle(currentLine.substr(columnNumber), { styles: [util_1.style.reset] });
                    }
                    content += `\n${currentLineStyled} | ${currentLine}`;
                }
            }
            content += `\n`;
            const fileAndLine = `${trace.getFileName()}:${lineNumber}`;
            log_1.log(`${native} ${trace} ${content}`);
        });
        log_1.seperator();
    }
}
exports.NutError = NutError;
//# sourceMappingURL=error.js.map