import fs from 'fs'
import https from 'https'
import path from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { NutError } from './error'
import { spinWrap } from './spinner'

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
  const fileWriteStream = fs.createWriteStream(path.join(__dirname, target))
  await spinWrap(request(source, fileWriteStream), `download: ${source}`)
}

export async function request (source: string, writeStream?: NodeJS.WritableStream) {
  let maxRedirect = 3
  let chunkedData = ''
  return new Promise(async (resolve, reject) => {
    https.get(source, async (response) => {
      switch (response.statusCode) {
        // Pipe the stream into the file
        case 200:
          if (writeStream) {
            await pipe(response, writeStream)
            resolve()
          } else {
            response.on('data', (data: any) => {
              chunkedData += data
            })
            response.on('end', () => {
              resolve(chunkedData)
            })
            response.on('error', (error) => {
              resolve(NutError.convertFromError(error))
            })
          }
          break

        // Follow the redirect or throw errow
        case 302:
          maxRedirect--
          source = response.headers.location!
          if (maxRedirect > 0) {
            await request(source, writeStream)
          } else {
            reject(new NutError('Max Redirect count (3) was reached'))
          }
          break

        // Unhandled scenario
        default:
          reject(new NutError(`Server responded with ${response.statusCode}: ${response.statusMessage}`))
          break
      }
    })
  })
}
