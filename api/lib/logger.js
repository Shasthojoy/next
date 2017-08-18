const logger = require('@therebel/log')
const { SERVICE_NAME, LOG_LEVEL, NODE_ENV } = require('../config')

module.exports = logger({ name: `${SERVICE_NAME} [${NODE_ENV}]`, level: LOG_LEVEL, env: NODE_ENV })
