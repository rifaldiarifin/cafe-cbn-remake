import { createSlice } from '@reduxjs/toolkit'

const activityChangesSlice = createSlice({
  name: 'activityChanges',
  initialState: {
    data: 0
  },
  reducers: {
    addActivityChanges: (state) => {
      state.data = state.data + 1
    }
  }
})

export const { addActivityChanges } = activityChangesSlice.actions
export default activityChangesSlice.reducer
