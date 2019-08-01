export const isDevelopmentMode = process.env.NODE_ENV === 'development'
export const isProductionMode = process.env.NODE_ENV === 'production'
export const isMac = process.platform === 'darwin'
export const isLinux = process.platform === 'linux'
export const isWindows = process.platform === 'win32'
export const isUnix = isMac || isLinux
