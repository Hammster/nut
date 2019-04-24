import fs from 'fs'
import path from 'path'
import glob from 'tiny-glob'

import { log } from './cli/log'
import { NutError } from './error'
import { spinWrap } from './spinner'

import { ICopyOptions } from '../types/fs'

const defaultOptions: ICopyOptions = {
  cwd: __dirname,
  flat: false,
  verbose: false
}

let options: ICopyOptions = { ...defaultOptions }

export function setOption (overrideOptions: Partial<ICopyOptions> = {}) {
  options = { ...options, ...overrideOptions }
}

export async function copy (sources: string[], target: string, overrideOptions: Partial<ICopyOptions> = {}) {
  if (Object.keys(overrideOptions).length !== 0) {
    setOption(overrideOptions)
  }

  if (!path.isAbsolute(target)) {
    target = path.join(options.cwd, target)
  }

  if (fs.existsSync(target)) {

    log(`globs:\t ${sources}`)
    log(`target:\t ${target}`)
    log(`options:\n${JSON.stringify(options, undefined, 2)}\n`)

    for (const source of sources) {
      const result: string[] = await spinWrap(glob(source, { cwd: options.cwd }), `copy: ${source}`)

      for (const resultItem of result) {
        const newRelativePath = options.flat ? path.basename(resultItem) : resultItem
        const contextSource = path.join(options.cwd, resultItem)
        const contextTarget = path.join(target, newRelativePath)
        const contextTargetFolder = path.dirname(contextTarget)

        if (!fs.existsSync(contextTargetFolder)) {
          fs.mkdirSync(contextTargetFolder, { recursive: true })
        }

        fs.copyFileSync(contextSource, contextTarget)
      }
    }
  } else {
    throw new NutError(`Target does not exist ${target}`)
  }
}

// @TODO: create, delete, move
