module.exports = () => {
  const createSuccessResponse =  (message, data, businessCode = '000') => {
    return {
      status: businessCode,
      message,
      data
    };
  }

  const createFailureResponse = (message, businessCode = '1000') => {
    return {
      status: businessCode,
      message
    };
  }

  return {
    createSuccessResponse,
    createFailureResponse
  }
};