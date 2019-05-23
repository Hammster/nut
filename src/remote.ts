import fs from 'fs'
import fetch from 'node-fetch'
import { pipeline } from 'stream'
import { promisify } from 'util'

import { IDownloadOptions } from '../types/remote'

const defaultOptions: IDownloadOptions = {}
const pipe = promisify(pipeline)

let options: IDownloadOptions = { ...defaultOptions }

function setOption (overrideOptions: Partial<IDownloadOptions> = {}) {
  options = { ...options, ...overrideOptions }
}

export async function download (source: string, target: string, overrideOptions: Partial<IDownloadOptions> = {}) {
  if (Object.keys(overrideOptions).length !== 0) {
    setOption(overrideOptions)
  }
  const fileWriteStream = fs.createWriteStream(target)
  await request(source, fileWriteStream)
}

export async function request (source: string, writeStream: NodeJS.WritableStream) {
  const res = await fetch(source)
  await new Promise((resolve, reject) => {
    res.body.pipe(writeStream)
    res.body.on('error', (err) => {
      reject(err)
    })
    writeStream.on('finish', () => {
      resolve()
    })
  })
}
