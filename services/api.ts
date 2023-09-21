import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { getToken } from "../utilities/token";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseHandler = (response: AxiosResponse) => response.data;
const requestHandler = async (req: InternalAxiosRequestConfig) => {
  const token = await getToken();
  req.headers.token = token;
  return req;
};
const errorHandler = (error: any) => {
  const highLevelMsg = error.message;
  const message = error?.response?.data?.message;
  console.log(message || highLevelMsg);
  if (error?.response?.data) {
    return Promise.reject(error?.response?.data);
  }
  return Promise.reject(null);
};

instance.interceptors.response.use(responseHandler, errorHandler);
instance.interceptors.request.use(requestHandler);

export default class API {
  static get(url: string, params = {}): Promise<any> {
    return instance({
      method: "GET",
      url,
      params,
    });
  }

  static post(url: string, data = {}, params = {}): Promise<any> {
    return instance({
      method: "POST",
      url,
      data,
      params,
    });
  }

  static put(url: string, data = {}, params = {}): Promise<any> {
    return instance({
      method: "PUT",
      url,
      data,
      params,
    });
  }

  static delete(url: string, params = {}, data = {}): Promise<any> {
    return instance({
      method: "DELETE",
      url,
      data,
      params,
    });
  }
}
