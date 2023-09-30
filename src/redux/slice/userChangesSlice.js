import { createSlice } from '@reduxjs/toolkit'

const userChangesSlice = createSlice({
  name: 'userChanges',
  initialState: {
    data: 0
  },
  reducers: {
    addUserChanges: (state) => {
      state.data = state.data + 1
    }
  }
})

export const { addUserChanges } = userChangesSlice.actions
export default userChangesSlice.reducer
