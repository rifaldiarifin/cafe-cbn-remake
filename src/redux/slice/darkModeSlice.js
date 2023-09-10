import { createSlice } from '@reduxjs/toolkit'

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    data: false
  },
  reducers: {
    setDarkMode: (state, actions) => {
      if (typeof actions.payload !== 'boolean') throw new Error('payload mus be a boolean')
      localStorage.setItem('darkMode', actions.payload)
      state.data = actions.payload
    },
    toggleDarkMode: (state) => {
      const bool = state.data ? false : true
      localStorage.setItem('darkMode', bool)
      state.data = bool
    }
  }
})

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer
