import readline from 'readline'
import { log, style } from './cli-log'
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
  process.stdout.write(`${style.green(spinner[spinState])} loading`)
}

export function spinWrap (wrappedFunction: Promise<any>): Promise<any> {
  spinInterval = setInterval(updateSpinner, 100)
  return new Promise((resolve, reject) => {
    /* tslint:disable:only-arrow-functions */
    wrappedFunction.then(function () {
      stopSpinner()
      process.stdout.write(`${style.green('✓')} done${showCursor}\n`)
      resolve(...arguments)
    }).catch((error: Error) => {
      stopSpinner()
      process.stdout.write(`${style.red('✗')} error${showCursor}\n${error}`)
      reject(error)
    })
  })
}

export function stopSpinner () {
  clearInterval(spinInterval)
  readline.clearLine(process.stdout, 0)
  readline.cursorTo(process.stdout, 0)
}
