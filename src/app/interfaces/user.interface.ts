import { Role } from '../enums/role.enum';

export interface UserInterface {
  ID: string;
  login: string;
  password: string;
  name: string;
  surname: string;
  role: Role;
}
