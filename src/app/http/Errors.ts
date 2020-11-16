import { Headers } from './httpHelpers';

export class AppError extends Error {
  constructor(public message: string = '', public type: string) {
    super(message);
  }
}

export class ApiError extends AppError {
  constructor(public message: string = '', public type: string, public data: any) {
    super(message, type);
  }
}

export class NetworkError extends AppError {
  constructor(public message: string = '', public type: string, public realMessage?: string) {
    super(message, type);
  }
}

export class FailedRequest extends AppError {
  constructor(
    public message: string = '',
    public type: string,
    public status: number,
    public url: string,
    public headers: Headers,
    public realMessage?: string,
  ) {
    super(message, type);
  }
}

export enum ErrorType {
  TimeoutError = 'timeout_error',
  ServerError = 'server_error',
  ApiError = 'api_error',
  NetworkError = 'network_error',
  UnknownError = 'unknown_error',
  FailedRequestError = 'failed_request',
  HttpError = 'http_error',
}
