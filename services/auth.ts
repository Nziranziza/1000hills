import API from "./api";

export type Credentials = {
  email: string;
  password: string;
};

export default class AuthAPI extends API {
  static baseUrl: string = "/auth";

  static getUrl(endpoint: string) {
    return `${this.baseUrl}/${endpoint}`;
  }

  static login(body: Credentials): Promise<any> {
    return this.post(this.getUrl("login"), body);
  }

  static signup(body: Credentials): Promise<any> {
    return this.post(this.getUrl("signup"), body);
  }

  static forgotPassword(email: string): Promise<any> {
    return this.post(this.getUrl("forgot-password"), { email });
  }
}
