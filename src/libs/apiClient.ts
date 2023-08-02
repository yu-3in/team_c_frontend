import axios, { AxiosError, AxiosResponse } from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

apiClient.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
    }

    return Promise.reject(error)
  }
)

export default apiClient
