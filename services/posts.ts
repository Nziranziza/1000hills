import API from "./api";

type QueryParams = {
  page?: number;
  limit?: number;
}

export type Media = {
  url: string;
  type: "image" | "video"
}

export type PostBody = {
  title: string;
  description: string;
  assets: Media[]
}

export default class PostAPI extends API {
  static baseUrl: string = "/posts";

  static getAll(params: QueryParams = { page: 1 }) {
    return this.get(this.baseUrl, params)
  }

  static create(body: PostBody) {
    return this.post(this.baseUrl, body)
  }

  static update() {
    return this.put(this.baseUrl)
  }

  static remove() {
    return this.delete(this.baseUrl)
  }
}