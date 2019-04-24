import { extract, pack } from './archive'
import { log, seperator, title } from './cli/log'
import { logTable } from './cli/table'
import { style } from './cli/util'
import { copy } from './fs'
import { download, request } from './remote'
import { spinWrap } from './spinner'

async function createTimeout (ms: number): Promise<any> {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

async function test (): Promise<any> {
  title('Test Logging')

  title('TitleText', { styles: [style.bgBlueBright, style.bold, style.underline] })

  log(`Log with ${style.red('style')}`, {
    indention: 0,
    styles: [style.yellow]
  })

  log(`Log with style and ${style.red('indention')}`, {
    indention: 1,
    styles: [style.bgGreen, style.bold, style.blue]
  })

  log(`Log with style, indention and ${style.red('padding')}`, {
    indention: 2,
    padding: true,
    styles: [style.bgBlueBright, style.white]
  })

  seperator()

  logTable([{ a: 1, b: 2 }, { a: 1 }], { columnNames: ['a', 'b'] })

  seperator()

  logTable(['c','d'], { textStyle: [style.green] })

  seperator()

  logTable([{ a: 1, b: 2 }, { a: 1 }], { borderStyle: [style.green] })

  title('Test Spinner')

  await spinWrap(createTimeout(10), '100ms')
  await spinWrap(createTimeout(50), '500ms')
  await spinWrap(createTimeout(100), '1000ms')

  title('Test Copy')
  await copy(['../tests/**/*.js'], '../tests/assets/b')

  title('Remote')
  await spinWrap(request('https://www.reddit.com/.json'), 'Grab a JSON from reddit')

  await download('https://hans-koch.me/2018-07-23_00-24-27.mp4', '../tests/assets/my.mp4')

  title('Archive')
  await pack('../tests/assets/my.mp4', '../ohwow.zip', 'zip')
  await extract('../ohwow.zip', '../tests/ohwow')
}

test()

process.on('unhandledRejection', () => undefined)
