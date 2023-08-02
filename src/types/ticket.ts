import { Genre } from './genre'
import { User } from './user'

export type Ticket = {
  id: number
  title: string
  description: string
  status: 'todo' | 'doing' | 'done'
  dueDate?: string
  startAt?: string
  endAt?: string
  User?: User
  Genre?: Genre
  createdAt: string
  updatedAt: string
}
