import { Document } from "mongoose";
import { HttpStatusCode } from "../types";
import { User } from "./user.interface";

export interface UserResponse {
  uid: string;
  name: string;
  token: string;
}
export interface UserFromDb extends Document, User {}

export type ResponseCreateUser = {
  status: HttpStatusCode;
} & (
  | {
      ok: true;
      data: UserResponse;
    }
  | {
      ok: false;
      msg: string;
    }
);

export type ResponseListUsers = {
  status: HttpStatusCode;
} & (
  | {
      ok: true;
      msg?: string;
      data: {
        total: number;
        users: Array<UserFromDb>;
      };
    }
  | {
      ok: false;
      msg: string;
    }
);

export type ResponseUpdateUser = {
  status: HttpStatusCode;
} & (
  | {
      ok: true;
      data: UserFromDb;
    }
  | {
      ok: false;
      msg: string;
    }
);

// export type ResponseDeleteUser = {
//   status: HttpStatusCode;
// } & (
//   | {
//       ok: true;
//       data: UserFromDb;
//     }
//   | {
//       ok: false;
//       msg: string;
//     }
// );

export type ResponseDeleteUser = {
  status: HttpStatusCode;
} & (
  | {
      ok: true;
      data: {
        userUpdated: UserFromDb;
        userAuthenticated: UserFromDb;
      };
    }
  | {
      ok: false;
      msg: string;
    }
);
