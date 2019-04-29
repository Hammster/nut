import { dirname, join } from 'path'

export const PROJECT_ROOT = dirname(require.main!.filename || process.mainModule!.filename)

export function pathFromRoot (path: string = './'): string {
  return join(PROJECT_ROOT, path)
}
