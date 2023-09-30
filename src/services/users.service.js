import api from '../api/api'

export const createUser = async (body) => {
  return await api.post('/user', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getUsersData = async () => {
  return await api.get('/user', { withCredentials: true })
}

export const getUserByID = async (id) => {
  return await api.get(`/user/${id}`, { withCredentials: true })
}

export const updateUserByID = async (id, body) => {
  return await api.put(`/user/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const deleteUserByID = async (id) => {
  return await api.delete(`/user/${id}`)
}
