const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errorMessage: err.message || "Something went wrong",
  };

  if (err.name === "ValidationError") {
    customError.errorMessage = Object.values(err.errors)
      .map((value) => value.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.errorMessage = `Duplicate value for ${Object.keys(
      err.keyValue
    )}`;
  }

  if (err.name === "CastError") {
    customError.errorMessage = `no resource found for the given id: ${
      Object.values(err.value)[0]
    }`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res
    .status(customError.statusCode)
    .json({ msg: customError.errorMessage });
};

module.exports = errorHandlerMiddleware;
