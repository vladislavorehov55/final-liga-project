import {IRole} from "./role";

export interface IUser {
  email: string
  password: string
  fio: string
}

export interface IUserGetResponse extends IUser {
  id: number
  roles: IRole[]
}
export interface IUserDeleteResponse {
  email: string
  id: number
  fio: number
  password: string
}
