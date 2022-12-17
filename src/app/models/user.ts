import {IRole} from "./role";

export interface IUser {
  id: number
  email: string
  password: string
  fio: string
}

export interface IUserGetResponse extends IUser {
  roles: IRole[]
}
export interface IUserDeleteResponse {
  email: string
  id: number
  fio: number
  password: string
}
