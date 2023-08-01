import { Genre } from './genre'
import { User } from './user'

export type Ticket = {
  id: number
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  dueDate: string
  startAt: string
  endAt: string
  user: User
  genre: Genre
  createdAt: string
  updatedAt: string
}
