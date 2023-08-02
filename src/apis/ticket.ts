import apiClient from '../libs/apiClient'
import { Sort } from '../types/sort'
import { Ticket } from '../types/ticket'

export const getTickets = (sort?: Sort, assign?: number, genre?: number) => {
  const queryParams: Record<string, string | number> = {}
  if (sort) {
    queryParams.sort = sort
  }
  if (assign) {
    queryParams.assign = assign
  }
  if (genre) {
    queryParams.genre = genre
  }

  return apiClient.get<Ticket[]>(`/tickets`, { params: queryParams }).then((res) => {
    return res.data
  })
}

export const getTicket = (id: number) => {
  return apiClient.get<Ticket>(`/tickets/${id}`).then((res) => {
    return res.data
  })
}

export type TicketRequest = {
  title: string
  status: string
  dueDate?: string
  startAt?: string
  endAt?: string
  description?: string
  userId?: number
  genreId: number
}
export const createTicket = (data: TicketRequest) => {
  return apiClient.post<Ticket>(`/tickets`, data).then((res) => {
    return res.data
  })
}

export const updateTicket = (id: number, data: TicketRequest) => {
  return apiClient.put<Ticket>(`/tickets/${id}`, data).then((res) => {
    return res.data
  })
}

export const deleteTicket = (id: number) => {
  return apiClient.delete<Ticket>(`/tickets/${id}`).then((res) => {
    return res.data
  })
}
