import apiClient from '../libs/apiClient'
import { Genre } from '../types/genre'

export const getGenres = () => {
  return apiClient
    .get<Genre[]>('/genres')
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getGenre = (id: number) => {
  return apiClient.get<Genre>(`/genres/${id}`).then((res) => {
    return res.data
  })
}

export const createGenre = (genre: Genre) => {
  return apiClient.post<Genre>(`/genres/${genre.id}`, genre).then((res) => {
    return res.data
  })
}

export const updateGenre = (genre: Genre) => {
  return apiClient.put<Genre>(`/genres/${genre.id}`, genre).then((res) => {
    return res.data
  })
}

export const deleteGenre = (id: number) => {
  return apiClient.delete<Genre>(`/genres/${id}`).then((res) => {
    return res.data
  })
}
