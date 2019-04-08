import { log, style, title } from './cli-log'
import { copy } from './copy'
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

  title('- Title', { styles: [style.bgRed, style.bold, style.underline] })
  log('- Log', { styles: [style.bgBlue, style.italic, style.yellow] })

  title('Test Spinner')

  await spinWrap(createTimeout(500))
  await spinWrap(createTimeout(100))
  await spinWrap(createTimeout(1500))
  await spinWrap(createTimeout(5000))

  title('Test Copy')
  copy(['./tests/assets/a/o*.js'], './tests/assets/b')
}

test().then(() => {
  log('done')
})
