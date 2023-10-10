import API from './api';

export type UpdateBody = {
  name?: string;
  phoneNumber?: string;
  bio?: string;
  profileUrl?: string
}

type QueryParams = {
  page?: number;
  limit?: number;
}

export default class UserAPI extends API {
  static baseUrl: string = "/user";

  static current(): Promise<any> {
    return this.get(this.baseUrl)
  }

  static update(body: UpdateBody): Promise<any> {
    return this.put(this.baseUrl, body)
  }

  static posts(params: QueryParams = { page: 1 }): Promise<any> {
    return this.get(`${this.baseUrl}/posts`, params)
  }
}
