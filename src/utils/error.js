module.exports = ({ responseHandlers }) => {
  const throwError = (message, status = 500) => {
    const error = new Error(message);
    error.statusCode = status;
    throw error;
  };
  
  const throwIf = (condition, message, status) => {
    if (condition) {
      throwError(message, status);
    }
  };

  const handleError = (err, req, res, next) => {
    const response = responseHandlers.createFailureResponse(err.message, err.businessCode);
    return res.status(err.statusCode || 500).json(response);
  };

  return { throwError, throwIf, handleError };
};