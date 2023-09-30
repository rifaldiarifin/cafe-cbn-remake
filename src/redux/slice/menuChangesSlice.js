import { createSlice } from '@reduxjs/toolkit'

const menuChangesSlice = createSlice({
  name: 'menuChanges',
  initialState: {
    data: 0
  },
  reducers: {
    addMenuChanges: (state) => {
      state.data = state.data + 1
    }
  }
})

export const { addMenuChanges } = menuChangesSlice.actions
export default menuChangesSlice.reducer
