import { createSlice } from '@reduxjs/toolkit'

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    data: {
      clickTarget: {
        className: null,
        tagName: null
      }
    }
  },
  reducers: {
    setClickTarget: (state, action) => {
      state.data.clickTarget.className = action.payload.className
      state.data.clickTarget.tagName = action.payload.tagName
    }
  }
})

export const { setClickTarget } = documentSlice.actions
export default documentSlice.reducer
