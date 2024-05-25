type Role = 'ADMIN' | 'CLIENT' | ''
type UserStatus = 'ACTIVE' | 'INACTIVE'

export interface IUser {
  uid: string
  name: string
  role: Role
  email: string
  active?: boolean
  status: UserStatus
  firstTimeToEnter: boolean
}

export interface FormCreateUser {
  name: string
  role: Role
  email: string
  password: string
}
