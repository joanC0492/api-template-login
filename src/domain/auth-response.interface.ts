interface User {
  uid: string;
  name: string;
  token: string;
}
export interface ResponseAuth {
  ok: boolean;
  msg?: string;
  data?: User;
  status: HttpStatusCode;
}

export interface ResponseValidateToken extends ResponseAuth {}

type HttpStatusCode =
  | 100
  | 101
  | 102
  | 103
  | 200
  | 201
  | 202
  | 204
  | 206
  | 300
  | 301
  | 302
  | 304
  | 307
  | 308
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 429
  | 500
  | 501
  | 502
  | 503
  | 504;
