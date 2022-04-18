const logger = require('../../logger');

const errorMiddleware = (err, req, res, next) => {
  const {statusCode, message} = err;
  logger.error(err);
  res.status(statusCode || 500).json({message});
};

module.exports = errorMiddleware;
