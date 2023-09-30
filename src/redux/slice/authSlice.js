import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      isLoading: false,
      userSession: null,
      isSignin: false
    }
  },
  reducers: {
    setAuth: (state, action) => {
      state.data.userSession = action.payload.userSession
      state.data.isSignin = action.payload.isSignin
    },
    setIsLoading: (state, action) => {
      state.data.isLoading = action.payload
    }
    // setIsSignin: (state, action) => {
    //     state.data.isSignin = action.payload
    // },
    // setUserSession: (state, action) => {
    //     state.data.userSession = action.payload
    // }
  }
})

export const { setIsLoading, setAuth } = authSlice.actions
export default authSlice.reducer
