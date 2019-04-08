import colorette, { reset } from 'colorette'
import { ICLILogDefaultOptions, ITextStyle } from '../types/cli-log'

const defaultOptions: ICLILogDefaultOptions = {
  seperatorCharacter: '─',
  seperatorLength: 80
}

let options: ICLILogDefaultOptions = { ...defaultOptions }
let seperator = ''

updateSeperator()

function updateSeperator () {
  seperator = options.seperatorCharacter.repeat(options.seperatorLength)
}

export function setOption (overrideOptions: Partial<ICLILogDefaultOptions>) {
  options = { ...options, ...overrideOptions }
  updateSeperator()
}

export function title (msg: string, textStyle: Partial<ITextStyle> = {}) {
  log(msg, textStyle)
  log(seperator)
}

export function log (msg: string, textStyle: Partial<ITextStyle> = {}) {
  if (textStyle.padding) {
    msg = ` ${msg} `
  }

  if (textStyle.indention) {
    msg = `${'\t'.repeat(textStyle.indention)}${msg}`
  }

  if (textStyle.styles) {
    textStyle.styles.forEach((styleFunction) => {
      msg = styleFunction(msg)
    })
  }

  // kleur has a issue with bgRed to prevent that we always reset after logging
  // tslint:disable-next-line:no-console
  console.log(msg + reset(''))
}

export { colorette as style }
