import { configureStore } from '@reduxjs/toolkit'
import documentReducer from './slice/documentSlice'
import cartOrderReducer from './slice/cartOrder'
import popupScreenReducer from './slice/popupScreenSlice'
import darkModeReducer from './slice/darkModeSlice'
import popupFormReducer from './slice/popupForm'
import authReducer from './slice/authSlice'
import userChangesReducer from './slice/userChangesSlice'
import menuChangesReducer from './slice/menuChangesSlice'
import groupChangesReducer from './slice/groupChangesSlice'
import activityChangesReducer from './slice/activityChangesSlice'
import transactionChangesReducer from './slice/transactionChangesSlice'

const store = configureStore({
  reducer: {
    cartOrder: cartOrderReducer,
    document: documentReducer,
    popupScreen: popupScreenReducer,
    darkMode: darkModeReducer,
    popupForm: popupFormReducer,
    auth: authReducer,
    userChanges: userChangesReducer,
    menuChanges: menuChangesReducer,
    activityChanges: activityChangesReducer,
    groupChanges: groupChangesReducer,
    transactionChanges: transactionChangesReducer
  }
})

// console.log("Oncreate Store : ", store.getState())

// store.subscribe(() => {
//     console.log("Store Change : ", store.getState().userChanges.data)
// })

export default store
