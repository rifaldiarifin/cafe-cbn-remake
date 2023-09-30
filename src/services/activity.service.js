import api from '../api/api'

// CREATE
export const createActivity = async (body) => {
  return await api.post('/activity', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// READ
export const getActivityData = async () => {
  return await api.get('/activity')
}

export const getActivityByID = async (id) => {
  return await api.get(`/activity/${id}`)
}

export const getMyActivity = async () => {
  return await api.get('/activity/me')
}

// DELETE
export const deleteActivityByID = async (id) => {
  return await api.delete(`/activity/${id}`)
}
