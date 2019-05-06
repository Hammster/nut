import { dirname, join } from 'path'

const mainFile = require.main !== undefined ? require.main.filename : null
const mainModule = process.mainModule !== undefined ? process.mainModule.filename : null

export const PROJECT_ROOT = dirname(mainFile || mainModule || './package.json')

export function pathFromRoot (path: string = './'): string {
  return join(PROJECT_ROOT, path)
}
