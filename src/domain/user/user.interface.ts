import { typeRole } from "../role";

export interface User {
  name: string;
  email: string;
  password: string;
  role: typeRole;
  state: boolean;
}
