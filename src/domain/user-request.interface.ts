import { IUser } from "./user.interface";

export interface RequestCreateNewUser extends IUser {
  [key: string]: unknown;
}