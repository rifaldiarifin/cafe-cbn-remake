import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

const api = axios.create({
  baseURL: BASE_URL
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken })
        const { accessToken } = response.data.result

        localStorage.setItem('accessToken', accessToken)

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axios(originalRequest)
      } catch (error) {
        throw new Error(`Failed to refresh token, Error:${error}`)
      }
    }
  }
)

export default api
