import {IRole} from "./role";

export interface IParsedToken {
  email: string
  id: number
  roles: IRole[]
}
