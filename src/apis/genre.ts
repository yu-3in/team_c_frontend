import apiClient from '../libs/apiClient'
import { Genre } from '../types/genre'

export const getGenres = () => {
  return apiClient.get<Genre[]>('/genres').then((res) => {
    return res.data
  })
}

export const getGenre = (id: number) => {
  return apiClient.get<Genre>(`/genres/${id}`).then((res) => {
    return res.data
  })
}

export type GenreRequest = {
  title: string
  color?: string
}

export const createGenre = (data: GenreRequest) => {
  return apiClient.post<Genre>(`/genres`, data).then((res) => {
    return res.data
  })
}

export const updateGenre = (id: number, data: GenreRequest) => {
  return apiClient.put<Genre>(`/genres/${id}`, data).then((res) => {
    return res.data
  })
}

export const deleteGenre = (id: number) => {
  return apiClient.delete<Genre>(`/genres/${id}`).then((res) => {
    return res.data
  })
}
