import { createSlice } from '@reduxjs/toolkit'

const transactionChangesSlice = createSlice({
  name: 'transactionChanges',
  initialState: {
    data: 0
  },
  reducers: {
    addTransactionChanges: (state) => {
      state.data = state.data + 1
    }
  }
})

export const { addTransactionChanges } = transactionChangesSlice.actions
export default transactionChangesSlice.reducer
