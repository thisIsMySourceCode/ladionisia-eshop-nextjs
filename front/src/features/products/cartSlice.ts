import { createSlice } from "@reduxjs/toolkit";
import { IProductCart } from "../../utils/types";

interface CartState {
  cart: IProductCart[],
  display: boolean,
  totalSell: number,
  subTotal: number[]
}

const initialState = {
  cart: [],
  totalSell: 0,
  display: false,
  subTotal: []
} as CartState

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    minusOneProduct: (state, action) => {
      state.cart = state.cart.map(c => {
        if (c.id === action.payload && c.quantity > 0) {
          return {
            ...c,
            quantity: c.quantity - 1
          }
        }
        else return c
      })
    },
    plusOneProduct: (state, action) => {
      state.cart = state.cart.map(c => {
        if (c.id === action.payload) {
          return {
            ...c,
            quantity: c.quantity + 1
          }
        }
        else return c
      })
    },
    addNewProduct: (state, action) => {
      const product = action.payload
      const productExists = !!state.cart.find(c => c.id === product.id)
      
      if (productExists) {
        state.cart = state.cart.map(c => {
          if (c.id === action.payload.id && c.quantity > c.product.stock) {
            return {
              ...c,
              quantity: c.quantity + 1
            }
          }
          else return c
        })
      }
      else {
        state.cart = state.cart.concat({ id: product.id, product, quantity: 1 })
      }
    },
    minusAllProducts: (state,action) => {
      state.cart = state.cart.filter(c => c.id !== action.payload)
    },
    displayCart: (state) => {
      state.display = !state.display
    },
    clearCart: (state) => {
      state.cart = []
    },
    totalPrice: (state, action) => {
      action.payload.filter(e => {
        state.totalSell += e
      })
    },
    setSubtotalArray: (state, action) => {
      state.subTotal = state.subTotal.concat(action.payload)
    }

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
})

export default cartSlice.reducer

export const selectCart = (state) => state.cart.cart;
export const selectDisplay = (state) => state.cart.display;


export const {
  minusOneProduct,
  plusOneProduct,
  addNewProduct,
  displayCart,
  minusAllProducts,
  clearCart
} = cartSlice.actions;