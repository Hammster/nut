"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_log_1 = require("./cli-log");
class NutError extends Error {
    constructor(message) {
        cli_log_1.title('Error', { styles: [cli_log_1.style.bgRed] });
        super(cli_log_1.style.red(message));
        // Ensure the name of this error is the same as the class name
        this.name = this.constructor.name;
        // This clips the constructor invocation from the stack trace.
        // It's not absolutely essential, but it does make the stack trace a little nicer.
        //  @see Node.js reference (bottom)
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.NutError = NutError;
