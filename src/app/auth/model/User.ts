import {Role} from "./Role";

export class User {
  id: number | undefined;
  login: string | undefined;
  password: string | undefined;
  email: string | undefined;
  powers: Array<Role> | undefined; // USER, ADMIN
}
