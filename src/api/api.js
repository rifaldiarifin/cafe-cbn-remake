import axios from 'axios'
import CONFIG from '../config/environment'
const BASE_URL = CONFIG.BaseUrlAPI

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error?.response?.status === 401) {
      originalRequest._retry = true
      try {
        const refresh = await axios.get(`${BASE_URL}/auth/refresh`, { withCredentials: true })
        const newAccessToken = refresh.data.result.accessToken
        localStorage.setItem('access_token', newAccessToken)
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return axios(originalRequest)
      } catch (error) {
        throw new Error(`Failed to refresh token, Error:${error}`)
      }
    } else if (error.response.status === 403) {
      localStorage.removeItem('access_token')
    }

    return Promise.reject(error)
  }
)

export default api
