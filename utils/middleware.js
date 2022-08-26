const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, _response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  }
  logger.error(error.message);
  next(error);
};

const getToken = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  } 
  next();
};

const userExtractor = (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({
      error: "token missing",
    });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log(decodedToken);

  if (!decodedToken.id) {
    return response.status(401).json({
      error: "token invalid",
    });
  }

  request.user = decodedToken.id;

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getToken,
  userExtractor,
};
