import { Genre } from './genre'

export type User = {
  id: number
  name: string
  email: string
  genres: Genre[]
  createdAt: string
  updatedAt: string
}
