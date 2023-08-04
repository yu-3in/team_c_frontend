import { Genre } from './genre'

export type User = {
  id: number
  name: string
  email: string
  genres?: Genre[]
  departmentName?: string
  productName?: string
  iconColor?: string
  createdAt: string
  updatedAt: string
}
