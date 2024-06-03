export type Link = {
  id: string
  url: string
  name: string
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
