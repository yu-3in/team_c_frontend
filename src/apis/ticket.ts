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

export const createTicket = (ticket: Ticket) => {
  return apiClient.post<Ticket>(`/tickets`, ticket).then((res) => {
    return res.data
  })
}

export const updateTicket = (ticket: Ticket) => {
  return apiClient.put<Ticket>(`/tickets/${ticket.id}`, ticket).then((res) => {
    return res.data
  })
}

export const deleteTicket = (id: string) => {
  return apiClient.delete<Ticket>(`/tickets/${id}`).then((res) => {
    return res.data
  })
}
