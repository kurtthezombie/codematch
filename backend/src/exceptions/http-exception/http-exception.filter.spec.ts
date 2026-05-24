import { ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(() => {
    filter = new HttpExceptionFilter();
  });

  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });

  it('should return correct status code, path, and message', () => {
    const mockJson = jest.fn();

    const mockStatus = jest.fn().mockReturnValue({
      json: mockJson,
    });

    const mockRequest = {
      url: '/users/1',
    };

    const mockResponse = {
      status: mockStatus,
    };

    const mockHost = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
        getResponse: () => mockResponse,
      }),
    } as ArgumentsHost;

    const exception = new HttpException(
      {
        message: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );

    filter.catch(exception, mockHost);

    // verify status()
    expect(mockStatus).toHaveBeenCalledWith(
      HttpStatus.NOT_FOUND,
    );

    // verify json() body
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: expect.any(String),
      path: '/users/1',
      message: 'User not found',
    });
  });
});
