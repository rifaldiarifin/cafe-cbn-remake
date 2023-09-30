import api from '../api/api'

// CREATE
export const createMenu = async (body) => {
  return await api.post('/menu', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const createGroupMenu = async (body) => {
  return await api.post('/menu/groups', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// READ
export const getMenuData = async () => {
  return await await api.get('/menu')
}

export const getMenuDataOnlyUuid = async () => {
  return await api.get('/menu/uuidgroups')
}

// UPDATE
export const updateMenuByID = async (id, body) => {
  return await api.put(`/menu/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateMenusInGroupByID = async (id, action, body) => {
  return await api.put(`/menu/groups/${id}/menus/${action}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const updateGroupMenuByID = async (id, body) => {
  return await api.put(`/menu/groups/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// DELETE
export const deleteMenuDataByID = async (id) => {
  return await api.delete(`/menu/${id}`)
}

export const deleteGroupByID = async (id) => {
  return await api.delete(`/menu/groups/${id}`)
}
