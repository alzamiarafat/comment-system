const { HttpStatus } = require("../shared/constant/httpCode");

const errorResponserHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HttpStatus.badRequest;
  let message = err.message || "An error occurred";

  // Handle Axios errors specifically
  if (err.response && err.response.data) {
    const errorData = err.response.data;
    statusCode = err.response.status || statusCode;
    message = errorData.message || errorData.error || message;
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    statusCode = HttpStatus.badRequest;
    message = "Validation failed";
  }

  // Handle API-specific errors
  if (err.apiError) {
    statusCode = err.statusCode || HttpStatus.badRequest;
    message = err.message;
  }

  const response = {
    message: message,
    statusCode: statusCode,
    data: null,
  };

  res.status(statusCode).send(response);
};

const invalidPathHandler = (req, res, next) => {
  console.log("🚀 ~ invalidPathHandler ~ req:", req.originalUrl);
  res.status(HttpStatus.notFound).json({
    statusCode: HttpStatus.notFound,
    data: {
      path: req.originalUrl,
      method: req.method,
    },
    message: "Route not found",
  });
};

module.exports = {
  errorResponserHandler,
  invalidPathHandler,
};
