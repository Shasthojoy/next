const express = require('express')
const postgraphql = require('postgraphql').default
const logger = require('./lib/logger')
const {
  isDev,
  SERVICE_NAME,
  PORT
} = require('./config')

const {
  POSTGRES_URL
} = require('./config')

const app = express()

app.use(postgraphql(POSTGRES_URL, {
  graphiql: true,
  classicIds: true,
  watchPg: isDev
}))

app.listen(PORT, () => {
  if (isDev) {
    logger.debug("LOG_LEVEL is set to include 'debug'. You'll be receiving more console output than usual")
    logger.info("LOG_LEVEL is set to include 'info'. You'll be receiving standard info output")
    logger.warning("LOG_LEVEL is set to include 'warning'. You'll be receiving warning output")
    logger.error("LOG_LEVEL is set to include 'error'. You'll be receiving error output")
  }
  logger.info(`> ${SERVICE_NAME} ready on port ${PORT}`)
})
