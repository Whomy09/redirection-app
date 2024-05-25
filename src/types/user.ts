type Role = 'ADMIN' | 'CLIENT' | ''

export interface IUser {
  id: string
  uid: string
  name: string
  role: Role
  email: string
  active: boolean
  firstTimeToEnter: boolean
}

export interface FormCreateUser {
  name: string
  role: Role
  email: string
  password: string
}
