import { createSlice } from '@reduxjs/toolkit'

const adminPanelSlice = createSlice({
  name: 'adminPanel',
  initialState: {
    data: {
      navActive: window.screen.width > 768 ? true : false,
      asideActive: window.screen.width > 768 ? true : false
    }
  },
  reducers: {
    toggleNavActive: (state) => {
      state.data.navActive = !state.data.navActive
    },
    toggleAsideActive: (state) => {
      state.data.asideActive = !state.data.asideActive
    },
    setNavActive: (state, action) => {
      state.data.navActive = action.payload
    },
    setAsideActive: (state, action) => {
      state.data.asideActive = action.payload
    }
  }
})

export const { toggleAsideActive, toggleNavActive, setAsideActive, setNavActive } = adminPanelSlice.actions
export default adminPanelSlice.reducer
