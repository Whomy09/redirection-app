export interface IUser {
  id: string
  uid: string
  name: string
  role: string
  email: string
  active: boolean
  password?: string
  firstTimeToEnter: boolean
}
