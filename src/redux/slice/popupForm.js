import { createSlice } from '@reduxjs/toolkit'

const popupFormSlice = createSlice({
  name: 'popupForm',
  initialState: {
    data: {
      status: false,
      formUser: {
        status: false,
        action: '',
        formData: false
      },
      formMenu: {
        status: false,
        action: '',
        formData: false
      }
    }
  },
  reducers: {
    setFormUser: (state, action) => {
      if (action.payload.action === 'update') state.data.formUser.formData = action.payload.formData
      state.data.formUser.action = action.payload.action
      state.data.status = true
      state.data.formUser.status = true
    },
    closeFormUser: (state) => {
      state.data.formUser.action = ''
      state.data.formUser.formData = false
      state.data.status = false
      state.data.formUser.status = false
    },

    setFormMenu: (state, action) => {
      state.data.formMenu.formData = action.payload.formData
      state.data.formMenu.action = action.payload.action
      state.data.status = true
      state.data.formMenu.status = true
    },
    closeFormMenu: (state) => {
      state.data.formMenu.action = ''
      state.data.formMenu.formData = false
      state.data.status = false
      state.data.formMenu.status = false
    }
  }
})

export const { setFormUser, closeFormUser, closeFormMenu, setFormMenu } = popupFormSlice.actions
export default popupFormSlice.reducer
