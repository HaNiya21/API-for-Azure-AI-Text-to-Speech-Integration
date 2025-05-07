class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
      super(400, message);
    }
  }
  
  class UnauthorizedError extends ApiError {
    constructor(message = 'Unauthorized') {
      super(401, message);
    }
  }
  
  module.exports = { ApiError, BadRequestError, UnauthorizedError };