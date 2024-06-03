export type Link = {
  name: string
  url: string
  percentage: number
}

export interface IRedirectionForm {
  id: string
  name: string
  links: Link[]
}

export interface IRedirection {
  id: string
  uid: String
  name: string
  links: Link[]
  createdAt: Date
  status: 'ACTIVE' | 'INACTIVE'
}
