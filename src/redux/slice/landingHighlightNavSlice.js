import { createSlice } from '@reduxjs/toolkit'

const landingHighlightNavSlice = createSlice({
  name: 'landingHighlightNavSlice',
  initialState: {
    data: []
  },
  reducers: {
    setHighlight: (state, action) => {
      state.data = action.payload
    },
    switchHighlight: (state, action) => {
      state.data.map((currState) => (currState.isActive = false))
      state.data[action.payload].isActive = true
    }
  }
})

export const { setHighlight, switchHighlight } = landingHighlightNavSlice.actions
export default landingHighlightNavSlice.reducer
