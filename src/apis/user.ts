import apiClient from '../libs/apiClient'
import { User } from '../types/user'

export const signUp = (name: string, email: string, password: string) => {
  return apiClient
    .post<{ token: string }>('/signup', {
      name,
      email,
      password,
    })
    .then((res) => {
      localStorage.setItem('token', res.data.token)

      return res.data
    })
}

export const signIn = (email: string, password: string) => {
  return apiClient.post<{ token: string }>('/login', { email, password }).then((res) => {
    localStorage.setItem('token', res.data.token)

    return res.data
  })
}

export const signOut = () => {
  return apiClient.post<User>('/logout').then((res) => {
    localStorage.removeItem('token')

    return res.data
  })
}

export const getUsers = () => {
  return apiClient.get<User[]>('/users').then((res) => {
    return res.data
  })
}

export const getUser = (id: number) => {
  return apiClient.get<User>(`/users/${id}`).then((res) => {
    return res.data
  })
}

export const deleteUser = (id: string) => {
  return apiClient.delete<User>(`/users/${id}`).then((res) => {
    return res.data
  })
}

export const getMe = () => {
  return apiClient.get<User>('/me').then((res) => {
    return res.data
  })
}

export type UpdateMeRequest = {
  name: string
  email: string
  departmentName?: string
  productName?: string
}

export const updateMe = (user: UpdateMeRequest) => {
  return apiClient.put<User>('/me', user).then((res) => {
    return res.data
  })
}

export const deleteMe = () => {
  return apiClient.delete<User>('/me').then((res) => {
    return res.data
  })
}

export const updateUsersGenres = (genreIds: number[]) => {
  return apiClient.put<User>('/users/genres', { genreIds }).then((res) => {
    return res.data
  })
}
