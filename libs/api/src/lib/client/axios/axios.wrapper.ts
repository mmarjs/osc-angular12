// https://github.com/axios/axios#axios-api
import axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { AxiosObservable } from './observable.interface';
import { from } from './rxjs.wrapper';

class Axios {
  static defaults: any = axios.defaults;

  static interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse>;
  } = axios.interceptors;

  static request<T = any>(config: AxiosRequestConfig): AxiosObservable<T> {
    return from(axios.request(config));
  }

  static get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.get(url, config));
  }

  static post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.post(url, data, config));
  }

  static put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.put(url, data, config));
  }

  static patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.patch(url, data, config));
  }

  static delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.delete(url, config));
  }

  static head<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(axios.head(url, config));
  }

  static create(config: AxiosRequestConfig): Axios {
    return new Axios(axios.create(config));
  }

  constructor(private axiosInstance: AxiosInstance) {}

  request<T = any>(config: AxiosRequestConfig): AxiosObservable<T> {
    return from(this.axiosInstance.request(config));
  }

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return from(this.axiosInstance.get(url, config));
  }

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosObservable<T> {
    return from(this.axiosInstance.head(url, config));
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(this.axiosInstance.post(url, data, config));
  }

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(this.axiosInstance.put(url, data, config));
  }

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(this.axiosInstance.patch(url, data, config));
  }

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): AxiosObservable<T> {
    return from(this.axiosInstance.delete(url, config));
  }

  get defaults() {
    return this.axiosInstance.defaults;
  }
}

export { Axios };
