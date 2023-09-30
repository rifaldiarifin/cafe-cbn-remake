import axios from 'axios'
import CONFIG from '../config/environment'

export const refreshToken = async () => {
  return await axios.get('/auth/refresh', {
    baseURL: CONFIG.BaseUrlAPI,
    withCredentials: true
  })
}

export const verifyToken = async (body) => {
  return await axios.post('/auth/verify', JSON.stringify(body), {
    baseURL: CONFIG.BaseUrlAPI,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })
}
