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
import adminPanelReducer from './slice/adminPanelSlice'
import landingHighlightNavReducer from './slice/landingHighlightNavSlice'

const store = configureStore({
  reducer: {
    cartOrder: cartOrderReducer,
    document: documentReducer,
    popupScreen: popupScreenReducer,
    darkMode: darkModeReducer,
    popupForm: popupFormReducer,
    auth: authReducer,
    adminPanel: adminPanelReducer,
    landingHighlightNav: landingHighlightNavReducer,
    userChanges: userChangesReducer,
    menuChanges: menuChangesReducer,
    activityChanges: activityChangesReducer,
    groupChanges: groupChangesReducer,
    transactionChanges: transactionChangesReducer
  }
})

export default store
