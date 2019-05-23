import { exec } from 'child_process'
import { isAbsolute, join } from 'path'
import { NutError } from './error'
import { spinWrap } from './spinner'

export async function extract (source: string, target: string = './') {
  if (!isAbsolute(source)) {
    source = join(__dirname, source)
  }

  if (!isAbsolute(target)) {
    target = join(__dirname, target)
  }

  await new Promise((resolve, reject) => {
    exec(`7z x "${source}" "-o${target}" -y`, (error, stdout, stderr) => {
      if (error) {
        reject(new NutError(error.message))
        return
      }

      resolve(stdout.trim())
    })
  })
}

export async function pack (source: string, target: string, archiveType = '7z') {
  const typeSwitch = `-t${archiveType}`

  if (!isAbsolute(source)) {
    source = join(__dirname, source)
  }

  if (!isAbsolute(target)) {
    target = join(__dirname, target)
  }

  await new Promise((resolve, reject) => {
    exec(`7z a ${typeSwitch} ${target} ${source}`, (error, stdout, stderr) => {
      if (error) {
        reject(new NutError(error.message))
        return
      }

      resolve(stdout.trim())
    })
  })
}
