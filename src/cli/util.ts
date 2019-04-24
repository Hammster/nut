import colorette from 'colorette'
import { ITextStyle } from '../../types/cli-util'

export function applyStyle (msg: string, textStyle: Partial<ITextStyle> = {}): string {
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

  return msg
}

export { colorette as style }
