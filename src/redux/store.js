import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './slice/documentSlice'
import cartOrderReducer from './slice/cartOrder'
import popupScreenReducer from './slice/popupScreenSlice'
import darkModeReducer from './slice/darkModeSlice'
import popupFormReducer from './slice/popupForm'

const store = configureStore({
  reducer: {
    cartOrder: cartOrderReducer,
    document: documentReducer,
    popupScreen: popupScreenReducer,
    darkMode: darkModeReducer,
    popupForm: popupFormReducer
  }
})

// console.log("Oncreate Store : ", store.getState())

// store.subscribe(() => {
//     console.log("Store Change : ", store.getState().popupScreen)
// })

export default store
