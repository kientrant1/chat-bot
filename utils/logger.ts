const error = (message: string, data?: unknown) => {
  // if (isDev) {
  //   throw new Error(message)
  // }
  if (data !== undefined) {
    console.error(`[Error]: ${message}`, data)
  } else {
    console.error(`[Error]: ${message}`)
  }
}

const info = (message: string, data?: unknown) => {
  if (data !== undefined) {
    console.info(`[Info]: ${message}`, data)
  } else {
    console.info(`[Info]: ${message}`)
  }
}

const warn = (message: string, data?: unknown) => {
  if (data !== undefined) {
    console.warn(`[Warn]: ${message}`, data)
  } else {
    console.warn(`[Warn]: ${message}`)
  }
}

const logger = { error, info, warn }

export default logger
