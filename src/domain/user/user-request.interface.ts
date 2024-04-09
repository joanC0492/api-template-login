import { UserFromDb } from "./user-response.interface";
import { User } from "./user.interface";

export interface RequestCreateUser extends User {
  [key: string]: unknown;
}

export interface RequestListUsers {
  limit: number;
  offset: number;
  [key: string]: unknown;
}

// export interface RequestUpdateUser extends User {
//   uid: string;
//   name: string;
//   userAuthenticated: UserFromDb;
//   [key: string]: unknown;
// }
// export interface RequestDeleteUser {
//   uid: string;
//   name: string;
//   userAuthenticated: UserFromDb;
//   [key: string]: unknown;
// }
export interface RequestUpdateUser extends User {
  uidAuthenticated: string;
  nameAuthenticated: string;
  userAuthenticated: UserFromDb;
  [key: string]: unknown;
}
export interface RequestDeleteUser {
  uidAuthenticated: string;
  nameAuthenticated: string;
  userAuthenticated: UserFromDb;
  [key: string]: unknown;
}