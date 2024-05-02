export interface IRedirectionForm {
  id: string
  name: string
  links: string[]
}

export interface IRedirection {
  id: string
  name: string
  links: string[]
  createdAt: Date
  status: 'ACTIVE' | 'INACTIVE'
}
