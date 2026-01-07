const response = {
  successResponse: (code, msg, data) => {
    return {
      statusCode: code,
      data: data,
      message: msg,
    };
  },

  failedResponse: (code, msg, error) => {
    const errorData = error?.response?.data || error?.data || error;
    return {
      statusCode: code,
      data: errorData,
      message: msg,
    };
  },

  errorResponse: (message, payload, statusCode = 400) => {
    return {
      statusCode,
      message,
      data: payload,
    };
  },
};

module.exports = response;
