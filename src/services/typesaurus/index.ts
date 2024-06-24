import '@/services/firebase'
import { schema, type Typesaurus } from 'typesaurus'

export const db = schema(($) => ({
  users: $.collection<User>().sub({
    notes: $.collection<Note>()
  }),
  orders: $.collection<Order>(),
  books: $.collection<Book>()
}))

export type Schema = Typesaurus.Schema<typeof db>

interface User {
  name: string
}

interface Note {
  text: string
}

interface Order {
  userId: Schema['users']['Id']
  bookId: Schema['books']['Id']
}

interface Book {
  title: string
}
