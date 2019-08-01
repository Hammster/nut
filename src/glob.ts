import tglob from 'tiny-glob'
import { isMac } from './os'

interface IGlobOptions {
  cwd?: string
  dot?: boolean
  absolute?: boolean
  filesOnly?: boolean
  flush?: boolean
}

export async function glob (path: string, options: IGlobOptions = {}): Promise<string[]> {
  path = path.replace(/\\/g, '/')
  const globReturn = tglob(path, options)
    .then((pathMap) => {
      if (isMac && options.absolute) {
        pathMap.map((pathItem) => {
          if(pathItem.charAt(0) !== '/') {
            return `/${pathItem}`
          }
          return pathItem
        })
      }

      return pathMap
    })

  return globReturn
}
