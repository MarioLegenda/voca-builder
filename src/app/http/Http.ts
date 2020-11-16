import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import ErrorFactory from './ErrorFactory';
import { AppError } from './Errors';

export interface IHttp {
  send(options: AxiosRequestConfig): any;
}

export class Http implements IHttp {
  async send(options: AxiosRequestConfig) {
    const result = await this.sendRequest(options);

    if (result instanceof Error) {
      if (result.type) {
        throw result;
      }

      this.throwError(result);
    } else {
      return result.data;
    }
  }

  private async sendRequest(options: AxiosRequestConfig): Promise<AxiosResponse | AppError> {
    try {
      return await axios(options);
    } catch (e) {
      if (ErrorFactory.isNetworkError(e)) {
        return ErrorFactory.createNetworkError(e);
      }

      if (ErrorFactory.isTimoutError(e)) {
        return ErrorFactory.createTimeoutError();
      }

      return e;
    }
  }

  private throwError(err: AxiosError | AppError) {
    if (ErrorFactory.isServerError(err as AxiosError)) {
      throw ErrorFactory.createServerError();
    }

    err = err as AxiosError;

    if (ErrorFactory.isApiError(err.response as AxiosResponse)) {
      throw ErrorFactory.createApiError(err.response?.data);
    }

    if (ErrorFactory.isHttpError(err.response as AxiosResponse)) {
      throw ErrorFactory.createUnsuccessfulRequestError(err.response as AxiosResponse);
    }
  }
}
