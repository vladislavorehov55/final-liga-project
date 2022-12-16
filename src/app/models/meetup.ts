export interface IMeetupResponse {
  id: number
  name: string
  description: string
  location: string
  target_audience: string
  need_to_know: string
  will_happen: string
  reason_to_come: string
  time: string
  createdBy: number
  duration: number
  owner: {
    id: number
    email: string
    password: string
    fio: string
  }
  users: [
    {
      id: number
      email: string
      password: string
      fio: string
    }
  ]
}
export interface IMeetup extends IMeetupResponse{
  isOpened: boolean
  status: MeetupStatusEnum
  isOweCurrentUser: boolean
}
export enum MeetupStatusEnum {
  'PLANNED' = 'planned',
  'IN_PROGRESS' = 'in progress',
  'CONDUCTED' = 'conducted'
}
