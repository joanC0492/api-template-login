export interface RequestLoginUser {
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface RequestValidateToken {
  uid: string;
  name: string;
  [key: string]: unknown;
}
