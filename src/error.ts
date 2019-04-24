import fs from 'fs'
import readline from 'readline'
import { log, seperator, title } from './cli/log'
import { applyStyle, style } from './cli/util'

export class NutError extends Error {
  public static convertFromError (error: Error): NutError {
    return new NutError(error.message, error.stack!)
  }

  constructor (message: string, stack?: string) {
    super(message)

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name

    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor)
    Error.prepareStackTrace = this.printStackTrace

    // output the error
    this.printError()
  }

  private printError () {
    title('Error', { styles: [style.bgRed] })
    log(`\n${this.message}`, { styles: [style.red] })
  }

  private printStackTrace (_err: Error, stackTraces: NodeJS.CallSite[]) {
    title('Stacktrace')
    // line break
    log('')

    stackTraces.forEach((trace, index) => {
      const native = applyStyle(`${trace.isNative() ? 'Native' : 'Script'}`, {
        padding: true,
        styles: [style.yellow, style.magentaBright]
      })

      const columnNumber = trace.getColumnNumber() || 0
      const lineNumber = trace.getLineNumber() || 0
      const fileName = trace.getFileName()

      let content = `\n`

      if (fileName) {
        // this will flood the memory, node 11.7+ allows for better handling with
        // readline.createInterface await and for await
        const fileLines = fs.readFileSync(fileName, 'utf-8').split('\n')

        let currentLineIndex = (lineNumber >= 4 ? lineNumber - 4 : 0)

        for (currentLineIndex ; currentLineIndex <= (lineNumber + 2); currentLineIndex++) {
          let currentLine = fileLines[currentLineIndex]
          const currentLineStyled = applyStyle(currentLineIndex.toString().padStart(6, ' '), {
            styles: [lineNumber - 1 === currentLineIndex ? style.yellow : style.gray]
          })
          if (lineNumber - 1 === currentLineIndex) {
            const markercolor = [index === 0 ? style.bgRedBright : style.bgMagenta]
            currentLine = currentLine.substr(0, columnNumber - 1)
              + applyStyle(currentLine.charAt(columnNumber - 1), { styles: markercolor })
              + applyStyle(currentLine.substr(columnNumber), { styles: [style.reset] })
          }
          content += `\n${currentLineStyled} | ${currentLine}`
        }
      }
      content += `\n`

      const fileAndLine = `${trace.getFileName()}:${lineNumber}`

      log(`${native} ${trace} ${content}`)
    })

    seperator()
  }
}
