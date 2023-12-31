import axios from 'axios'
import CONFIG from '../config/environment'

const signOut = async () => {
  return await axios.get('/api/auth/logout', {
    withCredentials: true,
    baseURL: CONFIG.BaseUrlAPI
  })
}

export default signOut
