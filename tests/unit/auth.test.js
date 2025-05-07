const { authenticate } = require('../../src/middlewares/auth');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../src/utils/errors');

describe('Authentication Middleware', () => {
  let mockRequest, mockResponse, nextFunction;

  beforeEach(() => {
    mockRequest = { headers: {} };
    mockResponse = {};
    nextFunction = jest.fn();
    process.env.JWT_SECRET = 'test-secret';
  });

  test('should throw UnauthorizedError if no token', () => {
    expect(() => authenticate(mockRequest, mockResponse, nextFunction))
      .toThrow(UnauthorizedError);
  });

  test('should call next() with valid token', () => {
    const token = jwt.sign({ username: 'admin' }, 'test-secret');
    mockRequest.headers.authorization = `Bearer ${token}`;
    
    authenticate(mockRequest, mockResponse, nextFunction);
    expect(nextFunction).toHaveBeenCalled();
  });
});