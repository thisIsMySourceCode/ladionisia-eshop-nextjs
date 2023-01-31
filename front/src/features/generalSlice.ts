import { createSlice } from "@reduxjs/toolkit";

// interface CartState {
//   cart: IProductCart[],
//   display: boolean,
//   totalSell: number,
//   subTotal: number[]
// }

const initialState = {
  filters: [],
  minPageNumLim: 0,
  maxPageNumLim: 10,
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setFilters: (state, action) => {
      const objToReplace = state.filters.find(item => Object.keys(item).includes(Object.keys(action.payload)[0]));
      const index = state.filters.indexOf(objToReplace);
      if (index !== -1) {
        state.filters.splice(index, 1, action.payload);
      } else {
        state.filters.push(action.payload);
      }
    },
    setMinPageNumLim: (state, action) => {
      state.minPageNumLim = action.payload
    },
    setMaxPageNumLim: (state, action) => {
      state.maxPageNumLim = action.payload
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
  },
})

export default generalSlice.reducer

export const selectFilters = (state) => state.general.filters;
export const selectMinPageNumLim = (state) => state.general.minPageNumLim;
export const selectMaxPageNumLim = (state) => state.general.maxPageNumLim;


export const {
  setMinPageNumLim,
  setMaxPageNumLim,
  setFilters
} = generalSlice.actions;