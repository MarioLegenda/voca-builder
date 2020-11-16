import { AppError, ErrorType, FailedRequest } from './Errors';
import { AxiosResponse } from 'axios';

export interface Headers {
  [name: string]: string;
}

export function getHeaders(response: AxiosResponse): Headers {
  const headers = {};

  for (let [key, value] of response.headers) {
    headers[key] = value;
  }

  return headers;
}

export function throwError(response: AxiosResponse, message: string, e?: AppError) {
  const tmp = {
    message: message,
    realMessage: '',
  };

  if (e) {
    tmp.realMessage = e.message;
  }

  throw new FailedRequest(message, ErrorType.HttpError, response.status, response.request.url, getHeaders(response));
}
