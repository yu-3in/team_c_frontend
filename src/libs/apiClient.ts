import Axios from 'axios'

const apiClient = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default apiClient
