import api from '../api/api'

export const createTransaction = async (body) => {
  return await api.post('/transaction', JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const getTransactionData = async () => {
  return await api.get('/transaction')
}

export const getTransactionToday = async () => {
  return await api.get('/transaction/today')
}

export const updateTransactionByID = async (id, body) => {
  return await api.put(`/transaction/${id}`, JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
