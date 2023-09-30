import { createSlice } from '@reduxjs/toolkit'

const groupChangesSlice = createSlice({
  name: 'groupChanges',
  initialState: {
    data: 0
  },
  reducers: {
    addGroupChanges: (state) => {
      state.data = state.data + 1
    }
  }
})

export const { addGroupChanges } = groupChangesSlice.actions
export default groupChangesSlice.reducer
