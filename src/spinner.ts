import readline from 'readline'
import { style } from './cli/util'
import { NutError } from './error'

const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
let spinState = 0
let spinInterval: NodeJS.Timeout

const hideCursor = '\u001b[?25l'
const showCursor = '\u001b[?25h'

function updateSpinner () {
  // readline.clearLine(process.stdout, 0)
  process.stdout.write(hideCursor)
  readline.cursorTo(process.stdout, 0)
  spinState = (spinState + 1) % spinner.length
  process.stdout.write(`${style.green(spinner[spinState])}`)
}

export function spinWrap (wrappedFunction: Promise<any>, msg: string = 'loading'): Promise<any> {
  process.stdout.write(`${style.green(spinner[spinState])} ${msg}`)
  spinInterval = setInterval(updateSpinner, 100)

  return new Promise((resolve, reject) => {
    /* tslint:disable:only-arrow-functions */
    wrappedFunction
      .then(function () {
        stopSpinner()
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(`${style.green('✓')} ${msg}\n`)
        resolve(...arguments)
      })
      .catch((error: Error) => {
        stopSpinner()
        readline.cursorTo(process.stdout, 0)
        process.stdout.write(`${style.red('✗')} ${msg}${showCursor}\n`)
        reject(NutError.convertFromError(error))
      })
  })
}

export function stopSpinner () {
  clearInterval(spinInterval)
}
