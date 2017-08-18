const LOG_LEVEL = process.env.LOG_LEVEL || 'debug'
const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = process.env.PORT || 9999
const POSTGRES_URL = process.env.POSTGRES_URL || 'postgres://brigadehub:secret@localhost:5444/brigadehub'
const SERVICE_NAME = process.env.SERVICE_NAME || 'brigadehub-api'

const isDev = NODE_ENV === 'development'
const isNotDev = NODE_ENV !== 'development'
const isNotProd = NODE_ENV !== 'production'
const isProd = NODE_ENV === 'production'

module.exports = {
  LOG_LEVEL,
  NODE_ENV,
  PORT,
  POSTGRES_URL,
  SERVICE_NAME,
  isDev,
  isNotDev,
  isNotProd,
  isProd
}
