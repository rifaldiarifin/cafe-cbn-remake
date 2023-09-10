import { createSlice } from '@reduxjs/toolkit'

const cartOrderSlice = createSlice({
  name: 'cartOrder',
  initialState: {
    data: {
      navPayment: false,
      cart: []
    }
  },
  reducers: {
    addToCart: (state, action) => {
      if (typeof action.payload !== 'object') throw new Error('payload must be a number!')
      const itemCart = state.data.cart.find((menu) => menu.uuid === action.payload.uuid)
      if (itemCart && itemCart.qty >= 99) return
      itemCart ? itemCart.qty++ : state.data.cart.push(action.payload)
    },
    removeOneFromCart: (state, action) => {
      if (typeof action.payload !== 'object') throw new Error('payload must be a number!')
      const itemCart = state.data.cart.find((menu) => menu.uuid === action.payload.uuid)
      if (itemCart && itemCart.qty <= 1) return
      itemCart.qty--
    },
    removeFromCart: (state, action) => {
      if (typeof action.payload !== 'number') throw new Error('payload must be a number!')
      state.data.cart.splice(action.payload, 1)
    },
    toggleNav: (state) => {
      state.data.navPayment = state.data.navPayment ? false : true
    },
    resetCart: (state) => {
      state.data.cart = []
    }
  }
})

export const { addToCart, toggleNav, removeFromCart, resetCart, removeOneFromCart } = cartOrderSlice.actions
export default cartOrderSlice.reducer
