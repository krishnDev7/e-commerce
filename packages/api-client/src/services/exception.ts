import { ApiError } from "../type/api";

export class ExceptionService<T = ApiError> extends Error {
  public data: T;
  constructor(message: string, data: T) {
    super(message);
    this.data = data;
  }
}
