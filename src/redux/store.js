import { configureStore } from '@reduxjs/toolkit'
import simpleComboboxReducer from './slice/simpleComboBoxSlice'
import documentReducer from './slice/documentSlice'

const store = configureStore({
  reducer: {
    simpleCombobox: simpleComboboxReducer,
    document: documentReducer
  }
})

// console.log("Oncreate Store : ", store.getState())

// store.subscribe(() => {
//     console.log("Store Change : ", store.getState().document.data.clickTarget)
// })

export default store
