import { ApiError, AppError, ErrorType, FailedRequest, NetworkError } from './Errors';
import { getHeaders } from './httpHelpers';
import { AxiosResponse, AxiosError } from 'axios';

export default class ErrorFactory {
  static isNetworkError(e: AxiosError) {
    if (!e.response) {
      const re = new RegExp('timeout');

      return !re.test(e.message);
    }

    return false;
  }

  static isTimoutError(e: AxiosError) {
    const message = e.message;

    const re = new RegExp('timeout');

    return re.test(message);
  }

  static isServerError(err: AxiosError) {
    const status = err.response?.status as number;

    return status > 500 && status < 599;
  }

  static isHttpError(response: AxiosResponse) {
    const status = response.status;

    return status < 200 || status > 299;
  }

  static isApiError(response: AxiosResponse) {
    const status = response.status;

    return status === 400;
  }

  static createTimeoutError(): AppError {
    return new AppError('', ErrorType.TimeoutError);
  }

  static createServerError(): AppError {
    return new AppError('', ErrorType.ServerError);
  }

  static createApiError(data: any): ApiError {
    return new ApiError('', ErrorType.ApiError, data);
  }

  static createNetworkError(e: AxiosError): NetworkError {
    const tmp = { realMessage: '', message: '' };

    if (e) {
      tmp.realMessage = e.message;
      tmp.message = e.message;
    }

    return new NetworkError(tmp.message, ErrorType.NetworkError, tmp.realMessage);
  }

  static createUnknownError(e: AxiosError): AppError {
    const tmp = { message: '' };

    if (e) {
      tmp.message = e.message;
    }

    return new AppError(tmp.message, ErrorType.UnknownError);
  }

  static createFailedRequest(response: AxiosResponse, e: AppError, message: string) {
    const tmp = { realMessage: '' };

    if (e) {
      tmp.realMessage = e.message;
    }

    return new FailedRequest(message, ErrorType.FailedRequestError, response.status, response.request.url, getHeaders(response));
  }

  static createUnsuccessfulRequestError(response: AxiosResponse) {
    return new FailedRequest('Unsuccessful request', ErrorType.HttpError, response.status, response.request.url, response.headers);
  }
}
