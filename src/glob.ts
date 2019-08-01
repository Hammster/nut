import tglob from 'tiny-glob'

interface IGlobOptions {
  cwd?: string
  dot?: boolean
  absolute?: boolean
  filesOnly?: boolean
  flush?: boolean
}

export async function glob (path: string, options: IGlobOptions = {}): Promise<string[]> {
  path = path.replace(/\\/g, '/')
  return tglob(path, options)
}
