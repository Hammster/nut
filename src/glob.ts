import nodeGlob from 'glob'

interface IGlobOptions {
  cwd?: string
  dot?: boolean
  absolute?: boolean
  filesOnly?: boolean
}

export async function glob (path: string, options: IGlobOptions = {}): Promise<string[]> {
  path = path.replace(/\\/g, '/')
  return new Promise((resolve, reject) => nodeGlob(path, options, (error, matches) => {
    if (error) {
      reject(error)
    }
    resolve(matches)
  }))
}
