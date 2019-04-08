import fs from 'fs'
import path from 'path'
import glob from 'tiny-glob'
import { log, style } from './cli-log'
import { NutError } from './error'
import { spinWrap } from './spinner'

export function copy (sources: string[], target: string) {
  if (!path.isAbsolute(target)) {
    target = path.join(__dirname, target)
  }

  log('semething')

  if (fs.existsSync(target)) {
    log(`Copy to ${target}`)
    sources.forEach(async (source) => {
      spinWrap(glob(source))
        .then((result) => {
          /* tslint:disable */
          console.log(result)
        })
    })
  } else {
    throw new NutError(`Target does not exist (${target})`)
  }
}
