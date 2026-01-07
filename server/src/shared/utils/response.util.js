const { HttpStatus } = require("../constant/httpCode");

const response = {
  successResponse: (code, msg, data) => {
    return {
      statusCode: code,
      data: data,
      message: msg,
    };
  },

  failedResponse: (code, msg, error) => {
    const errorData =
      error.errors || error?.response?.data || error?.data || error;
    return {
      statusCode: code,
      error: { ...errorData },
      message: msg,
    };
  },

  errorResponse: (message, error, statusCode = 400) => {
    const errorData =
      error.errors || error?.response?.data || error?.data || error;
    return {
      statusCode,
      error: { ...errorData },
      message,
    };
  },

  unauthorized: (res, message = "Unauthorized") => {
    res.status(HttpStatus.unauthorized).json({
      statusCode: HttpStatus.unauthorized,
      error: {
        status: "AUTH_UNAUTHORIZED",
      },
      message,
    });
  },

  forbidden: (res, message = "Forbidden") => {
    res.status(HttpStatus.forbidden).json({
      statusCode: HttpStatus.forbidden,
      error: {
        status: "AUTH_FORBIDDEN",
      },
      message,
    });
  },
};

module.exports = response;
