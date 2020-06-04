/* eslint-disable no-else-return */
const morgan = require('morgan')
const logger = require('./logger')

const morganMiddleware = (param) => {
// eslint-disable-next-line no-unused-vars
  morgan.token('body', (req, res) => JSON.stringify(req.body))
  return morgan(param)
}

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method)
  logger.info('Method:', req.path)
  logger.info('Method:', req.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, _req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({
      error: 'malformatted id',
    })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token',
    })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }

  next()
}

module.exports = {
  requestLogger,
  morganMiddleware,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}
