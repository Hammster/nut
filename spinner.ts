import readline from 'readline'
import { log, style } from './cli-log'
import { NutError } from './error'

const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
let spinState = 0
let spinInterval: NodeJS.Timeout

function updateSpinner () {
  // readline.clearLine(process.stdout, 0)
  process.stdout.write('\u001b[?25l')
  readline.cursorTo(process.stdout, 0)
  spinState = (spinState + 1) % spinner.length
  process.stdout.write(`${style.green(spinner[spinState])} loading`)
}

export function spinWrap (wrappedFunction: () => Promise<any>): Promise<any> {
  spinInterval = setInterval(updateSpinner, 100)
  return new Promise((resolve, reject) => {
    /* tslint:disable:only-arrow-functions */
    wrappedFunction().then(function () {
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      resolve(...arguments)
    }).catch((error: Error) => {
      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0)
      process.stdout.write('\n\n')
      reject(error)
    }).finally(() => {
      stopSpinner()
      process.stdout.write('\u001b[?25h')
    })
  })
}

export function stopSpinner () {
  clearInterval(spinInterval)
}
