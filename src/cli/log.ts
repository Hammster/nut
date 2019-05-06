import { ICLILogOptions } from '../../types/cli-log'
import { ITextStyle } from '../../types/cli-util'

import { applyStyle, style } from './util'

const defaultOptions: ICLILogOptions = {
  seperatorCharacter: '─',
  seperatorLength: 80,
  tableEntryMaxWidth: 16
}

let options: ICLILogOptions = { ...defaultOptions }
let seperatorString = ''

setOption()

function setOption (overrideOptions: Partial<ICLILogOptions> = {}) {
  options = { ...options, ...overrideOptions }
  seperatorString = options.seperatorCharacter.repeat(options.seperatorLength)
}

export function title (msg: string, textStyle: Partial<ITextStyle> = {}, seperatorStyle: Partial<ITextStyle> = {}) {
  msg = ` ${msg} `
  const seperatorStart = seperatorString.slice(0, 4)
  const seperatorEnd = seperatorString.slice(4, seperatorString.length - msg.length)
  const seperatorUnion =
    applyStyle(seperatorStart, seperatorStyle) + applyStyle(msg, textStyle) + applyStyle(seperatorEnd, seperatorStyle)

  log(`\n${seperatorUnion}`)
}

export function log (msg: any, textStyle: Partial<ITextStyle> = {}) {
  msg = msg.toString()

  // tslint:disable-next-line:no-console
  console.log(applyStyle(msg, textStyle) + style.reset(''))
}

export function seperator (textStyle: Partial<ITextStyle> = {}) {
  log(seperatorString, textStyle)
}
