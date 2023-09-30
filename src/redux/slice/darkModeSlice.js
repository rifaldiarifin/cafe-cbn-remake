import { createSlice } from '@reduxjs/toolkit'

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    data: false
  },
  reducers: {
    setDarkMode: (state, action) => {
      if (typeof action.payload !== 'boolean') throw new Error('payload mus be a boolean')
      localStorage.setItem('theme_mode', action.payload ? 'dark' : 'light')
      state.data = action.payload
    },
    toggleDarkMode: (state) => {
      const bool = state.data ? false : true
      localStorage.setItem('theme_mode', bool ? 'dark' : 'light')
      state.data = bool
    }
  }
})

export const { setDarkMode, toggleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer
