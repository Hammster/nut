import { blue, green, red, yellow } from 'kleur'
import glob from 'tiny-glob'
import { ITextStyle } from './types'

const defaultOptions = {
  seperatorCharacter: '─',
  seperatorLength: 20
}

const options = { ...defaultOptions }

const seperator = options.seperatorCharacter.repeat(20)

function title (msg: string) {
  log(seperator)
}

function log (msg: string, textStyle: Partial<ITextStyle> = {}) {
  // tslint:disable-next-line:no-console
  console.log(msg)
}
