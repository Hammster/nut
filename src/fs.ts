import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

import { log } from './cli/log'
import { NutError } from './error'
import { glob } from './glob'
import { spinWrap } from './spinner'

import { ICopyOptions } from '../types/fs'

const defaultOptions: ICopyOptions = {
  cwd: '.',
  flat: false,
  verbose: false
}

let options: ICopyOptions = { ...defaultOptions }

function setOption (overrideOptions: Partial<ICopyOptions> = {}) {
  options = { ...options, ...overrideOptions }
}

export async function copy (sources: string[], target: string, overrideOptions: Partial<ICopyOptions> = {}) {
  if (Object.keys(overrideOptions).length !== 0) {
    setOption(overrideOptions)
  }

  if (!path.isAbsolute(target)) {
    target = path.join(options.cwd, target)
  }

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }

  log(`globs:\t ${sources}`)
  log(`target:\t ${target}`)
  log(`options:\n${JSON.stringify(options, undefined, 2)}\n`)

  for (const source of sources) {
    const result: string[] = await glob(source, { absolute: true })

    for (const resultItem of result) {
      const contextSource = path.join(options.cwd, resultItem)
      const contextTarget = options.flat ? path.basename(resultItem) : path.relative(options.cwd, resultItem)
      const contextTargetAbsolute = path.join(target, contextTarget)
      const contextTargetFolder = path.dirname(contextTargetAbsolute)

      if (!fs.existsSync(contextTargetFolder)) {
        fs.mkdirSync(contextTargetFolder, { recursive: true })
      }

      fs.copyFileSync(contextSource, contextTargetAbsolute)
    }
  }
}

export async function fileHash (filePath: string): Promise<string> {
  const bufferList = []

  let absFilePath = path.join(options.cwd, filePath)
  // UC first latter on unix '/' keeps '/' on windows the drive latter will be capitalized
  absFilePath = absFilePath.charAt(0).toUpperCase() + absFilePath.slice(1)

  if (fs.existsSync(absFilePath)) {
    const stat = await fs.promises.lstat(absFilePath)

    if (stat.isFile()) {
      bufferList.push(Buffer.from(absFilePath))
      bufferList.push(fs.readFileSync(absFilePath))
    } else {
      throw new NutError('Given filepath is not a file')
    }

    const resultBuffer = Buffer.concat(bufferList)
    const hash = crypto.createHash('sha1')

    return hash.update(resultBuffer).digest('base64')
  } else {
    throw new NutError('Given filepath does not exist')
  }
}

export async function combineFileTreeHash (globData: string): Promise<string> {
  const paths = await glob(globData, { absolute: true })

  const bufferList = []

  for (let element of paths) {
    element = path.join(options.cwd, element)
    // UC first latter on unix '/' keeps '/' on windows the drive latter will be capitalized
    element = element.charAt(0).toUpperCase() + element.slice(1)

    const stat = await fs.promises.lstat(element)

    if (stat.isFile()) {
      bufferList.push(Buffer.from(element))
      bufferList.push(fs.readFileSync(element))
    } else {
      bufferList.push(Buffer.from(element))
    }
  }

  const resultBuffer = Buffer.concat(bufferList)
  const hash = crypto.createHash('sha1')

  return hash.update(resultBuffer).digest('base64')
}
