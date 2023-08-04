import apiClient from '../libs/apiClient'
import { Sort } from '../types/sort'
import { Ticket } from '../types/ticket'

export const getTickets = (sort?: Sort, userId?: number, genreId?: number) => {
  const queryParams: Record<string, string | number> = {}
  if (sort) {
    queryParams.sort = sort
  }
  if (userId) {
    queryParams.userId = userId
  }
  if (genreId) {
    queryParams.genreId = genreId
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
  raiseHandUserId?: number
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
