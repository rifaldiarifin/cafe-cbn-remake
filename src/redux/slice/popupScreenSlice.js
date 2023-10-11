import { createSlice } from '@reduxjs/toolkit'

const popupScreenSlice = createSlice({
  name: 'popupScreen',
  initialState: {
    data: {
      isActive: false,
      alertData: {
        actionName: '',
        titleBar: '',
        title: 'Hello World',
        description: 'Yoo Watsupppp bro :D',
        alertType: 'message',
        alertStyle: 'info',
        data: false,
        action: {
          yes: false,
          no: false,
          ok: false,
          close: false
        }
      }
    }
  },
  reducers: {
    setAlert: (state, action) => {
      state.data = {
        isActive: true,
        alertData: { ...state.data.alertData, ...action.payload }
      }
    },
    clickYes: (state) => {
      state.data.alertData.action.yes = true
    },
    clickNo: (state) => {
      state.data.alertData.action.no = true
    },
    clickOK: (state) => {
      state.data.alertData.action.ok = true
    },
    openPopup: (state) => {
      state.data.isActive = true
    },
    closePopup: (state) => {
      state.data.isActive = false
      state.data.alertData.action = {
        yes: false,
        no: false,
        ok: false,
        close: false
      }
    },
    clearDataPayload: (state) => {
      state.data.alertData.data = false
    }
  }
})

export const { closePopup, openPopup, setAlert, clickNo, clickOK, clickYes, clearDataPayload } =
  popupScreenSlice.actions
export default popupScreenSlice.reducer
