import childProcess, { ChildProcess } from 'child_process'
import { NutError } from './error'

export function spawn (command: string, args: string[] = []): Promise<number> {
  return new Promise((resolve, reject) => {
    const child = childProcess.spawn(command, args, { stdio: 'inherit' })

    child.on('close', (code, signal) => {
      if (code !== 0) {
        reject(new NutError('spawn failed'))
      }
      resolve(code)
    })
  })
}
