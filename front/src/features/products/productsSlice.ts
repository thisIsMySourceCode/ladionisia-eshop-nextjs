import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EStateGeneric, rateGen } from "../../utils/general";
import { IProduct } from "../../utils/types";
import { createOneProduct, getAllDisabledProducts, getAllProducts, getAllProductTypes, getOneProductById, getAllProductsByContry, updateOneProduct, getAllProductsByRegion, getAllProductsByName, postFavorite, getAllFavoritesApi, deleteFavoriteApi, deleteAllFavoritesApi, deleteOneProduct } from "./productsApi";

export const getAllWines = createAsyncThunk(
  'products/getAllWines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllProducts()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllDisabledWines = createAsyncThunk(
  'products/getAllDisabledWines',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllDisabledProducts()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getAllWineTypes = createAsyncThunk(
  'products/getAllWineTypes',
  async (type: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductTypes(type)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getOneWine = createAsyncThunk(
  'products/getOneWine',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getOneProductById(id)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const createWine = createAsyncThunk(
  'products/createWine',
  async (product: IProduct, { rejectWithValue }) => {
    try {
      const response = await createOneProduct(product)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const updateWine = createAsyncThunk(
  'products/updateWine',
  async (product: IProduct, { rejectWithValue }) => {
    try {
      const response = await updateOneProduct(product)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getAllWinesByContry = createAsyncThunk(
  'products/getAllWinesByContry',
  async (contry: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByContry(contry)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getAllWinesByRegion = createAsyncThunk(
  'products/getAllWinesByRegion',
  async (region: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByRegion(region)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
export const getAllWinesByName = createAsyncThunk(
  'products/getAllWinesByName',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await getAllProductsByName(name)
      return response.data
    } catch (error) {
      console.log(error.response.data)
      return [{ error: error.response.data }]
      // return rejectWithValue(error.response.data)
    }
  }
)

export const getAllFavorites = createAsyncThunk(
  'products/getAllFavorites',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await getAllFavoritesApi(userId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getFavorite = createAsyncThunk(
  'products/getFavorite',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getOneProductById(id)
      return response.data
    } catch (error) {
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)
export const createFavorite = createAsyncThunk(
  'products/createFavorite',
  async ({ userId, product }: { userId: any, product: IProduct }, { rejectWithValue }) => {
    try {
      const response = await postFavorite(userId, product)
      return response.data
    } catch (error) {
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)

export const deleteWine = createAsyncThunk(
  'products/deleteWine',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteOneProduct(id)
      return response.data
    } catch (error) {
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)


export const deleteFavorite = createAsyncThunk(
  'products/deleteFavorite',
  async ({ userId, productId }: { userId: any, productId: any }, { rejectWithValue }) => {
    try {
      const response = await deleteFavoriteApi(userId, productId)
      return response.data
    } catch (error) {
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)


export const deleteAllFavorites = createAsyncThunk(
  'products/deleteAllFavorites',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await deleteAllFavoritesApi(userId)
      return response.data
    } catch (error) {
      console.log(error.response)
      return rejectWithValue(error.response.data)
    }
  }
)

interface ProductsState {
  wines: IProduct[],
  winesCountry: IProduct[],
  disabledWines: IProduct[],
  regions: string[],
  winerys: string[],
  wineTypes: IProduct[],
  wine: IProduct,
  winesFilters: IProduct[],
  currentWines: IProduct[],
  filters: string[],
  allWinesStatus: EStateGeneric,
  allWinesCountryStatus: EStateGeneric,
  allDisabledWinesStatus: EStateGeneric,
  allWineTypesStatus: EStateGeneric,
  oneWineStatus: EStateGeneric,
  oneFavoriteStatus: EStateGeneric,
  favorites: IProduct[],
  allFavoritesStatus: EStateGeneric,
}

const initialState = {
  wines: [],
  wine: {},
  winesCountry: [],
  regions: [],
  winerys: [],
  winesFilters: [],
  currentWines: [],
  disabledWines: [],
  wineTypes: [],
  allWinesStatus: EStateGeneric.IDLE,
  allWinesCountryStatus: EStateGeneric.IDLE,
  allDisabledWinesStatus: EStateGeneric.IDLE,
  allWineTypesStatus: EStateGeneric.IDLE,
  oneWineStatus: EStateGeneric.IDLE,
  oneFavoriteStatus: EStateGeneric.IDLE,
  favorites: [],
  allFavoritesStatus: EStateGeneric.IDLE,
} as ProductsState

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    getRegiones: (state) => {
      state.winesCountry.filter(wine => {
        if (!state.regions.includes(wine.region)) {
          state.regions = [...state.regions, wine.region]
        }
      })
      state.regions.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) return 1
        else return -1
      })
    },
    getWinerys: (state) => {
      state.winerys = state.winerys
    },
    setWinerys: (state, action) => {
      action.payload.filter(wine => {
        if (!state.winerys.includes(wine.winery)) {
          state.winerys = [...state.winerys, wine.winery]
        }
      })
      state.winerys.sort((a, b) => {
        if (a.toLowerCase() > b.toLowerCase()) return 1
        else return -1
      })
    },
    orderByName: (state, action) => {
      const array = state.wineTypes.length > 0 ? [...state.wineTypes] :
        (state.winesFilters.length > 0 ? [...state.winesFilters] :
          (state.winesCountry.length > 0 ? [...state.winesCountry] :
            [...state.wines]));
      const winesOrderByName = action.payload === 'atoz' ? array.sort((a, b) => {
        if (a.wine.toLowerCase() > b.wine.toLowerCase()) return 1
        else return -1
      }) : array.sort((a, b) => {
        if (a.wine.toLowerCase() < b.wine.toLowerCase()) return 1
        else return -1
      })
      return {
        ...state,
        wines: winesOrderByName,
        winesCountry: winesOrderByName,
        winesFilters: winesOrderByName,
        wineTypes: winesOrderByName
      }
    },
    setCurrentWines: (state, action) => {
      state.currentWines = action.payload;
      console.log('reducer')
    },
    cleanUpState: (state) => {
      state.currentWines = [];
    },
    cleanUpStateFilters: (state) => {
      state.filters = [];
    },
    clearOneWine: (state) => {
      state.wine = {}
    },
    setFavorites: (state, action) => {
      state.favorites = state.favorites.filter(w => {
        if (w.id !== action.payload.id)
          return w
      });
    },
    getFavorites: (state, action) => {
      state.favorites = action.payload
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getAllWines.fulfilled, (state, action) => {
      state.wines = action.payload;
      state.allWinesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllWines.pending, (state, action) => {
      state.allWinesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllWines.rejected, (state, action) => {
      state.allWinesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(getAllDisabledWines.fulfilled, (state, action) => {
      state.disabledWines = action.payload;
      state.allDisabledWinesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllDisabledWines.pending, (state, action) => {
      state.allDisabledWinesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllDisabledWines.rejected, (state, action) => {
      state.allDisabledWinesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(getAllWineTypes.fulfilled, (state, action) => {
      state.wineTypes = action.payload;
      state.allWineTypesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllWineTypes.pending, (state, action) => {
      state.allWineTypesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllWineTypes.rejected, (state, action) => {
      state.allWineTypesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(getOneWine.fulfilled, (state, action) => {
      state.wine = action.payload;
      state.oneWineStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getOneWine.pending, (state, action) => {
      state.oneWineStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getOneWine.rejected, (state, action) => {
      state.oneWineStatus = EStateGeneric.FAILED;
    })


    builder.addCase(getFavorite.fulfilled, (state, action) => {
      // state.favorites = state.favorites.concat(action.payload);
      if (state.favorites && !state.favorites.includes(action.payload)) {
        state.favorites = state.favorites.concat(action.payload);
      }
      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getFavorite.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getFavorite.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(createWine.fulfilled, (state, action) => {
      state.wines = state.wines.concat(action.payload);
      state.allWinesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(createWine.pending, (state, action) => {
      state.oneWineStatus = EStateGeneric.PENDING;
    })
    builder.addCase(createWine.rejected, (state, action) => {
      state.oneWineStatus = EStateGeneric.FAILED;
    })



    builder.addCase(updateWine.fulfilled, (state, action) => {
      state.wines = state.wines.map(w => {
        if (w.id === action.payload.id)
          return { ...w, ...action.payload }
        else return w
      });
      state.allWinesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(updateWine.pending, (state, action) => {
      state.oneWineStatus = EStateGeneric.PENDING;
    })
    builder.addCase(updateWine.rejected, (state, action) => {
      state.oneWineStatus = EStateGeneric.FAILED;
    })



    builder.addCase(deleteWine.fulfilled, (state, action) => {
      state.disabledWines = state.disabledWines.map(w => {
        if (w.id !== action.payload.id)
          return w
      });
      state.allDisabledWinesStatus = EStateGeneric.SUCCEEDED;

    })
    builder.addCase(deleteWine.pending, (state, _action) => {
      state.allDisabledWinesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(deleteWine.rejected, (state, _action) => {
      state.allDisabledWinesStatus = EStateGeneric.FAILED;
    })


    builder.addCase(getAllWinesByContry.fulfilled, (state, action) => {
      state.winesCountry = action.payload;
      state.winesFilters = action.payload;
      state.allWinesCountryStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllWinesByContry.pending, (state, action) => {
      state.allWinesCountryStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllWinesByContry.rejected, (state, action) => {
      state.allWinesCountryStatus = EStateGeneric.FAILED;
    })



    builder.addCase(getAllWinesByName.fulfilled, (state, action) => {
      state.wines = action.payload;
      state.winesCountry = action.payload;
      state.wineTypes = action.payload;
      state.allWinesStatus = EStateGeneric.SUCCEEDED;
      state.allWinesCountryStatus = EStateGeneric.SUCCEEDED;
      state.allWineTypesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllWinesByName.pending, (state, action) => {
      state.allWinesStatus = EStateGeneric.PENDING;
      state.allWinesCountryStatus = EStateGeneric.PENDING;
      state.allWineTypesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllWinesByName.rejected, (state, action) => {
      state.allWinesStatus = EStateGeneric.FAILED;
      state.allWinesCountryStatus = EStateGeneric.FAILED;
      state.allWineTypesStatus = EStateGeneric.FAILED;
    })



    builder.addCase(getAllWinesByRegion.fulfilled, (state, action) => {
      state.winesCountry = action.payload;
      state.allWinesCountryStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllWinesByRegion.pending, (state, action) => {
      state.allWinesCountryStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllWinesByRegion.rejected, (state, action) => {
      state.allWinesCountryStatus = EStateGeneric.FAILED;
    })


    builder.addCase(getAllFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(getAllFavorites.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(getAllFavorites.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    })


    builder.addCase(createFavorite.fulfilled, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(createFavorite.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(createFavorite.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    })


    builder.addCase(deleteFavorite.fulfilled, (state, action) => {

      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(deleteFavorite.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(deleteFavorite.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    })


    builder.addCase(deleteAllFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload
      state.allFavoritesStatus = EStateGeneric.SUCCEEDED;
    })
    builder.addCase(deleteAllFavorites.pending, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.PENDING;
    })
    builder.addCase(deleteAllFavorites.rejected, (state, action) => {
      state.allFavoritesStatus = EStateGeneric.FAILED;
    })
  },
})

export default productsSlice.reducer

export const selectAllWines = (state) => state.products.wines;
export const selectAllDisabledWines = (state) => state.products.disabledWines;
export const selectAllWineTypes = (state) => state.products.wineTypes;
export const selectOneWine = (state) => state.products.wine;
export const selectAllWinesByContry = (state) => state.products.winesCountry;
export const selectAllWinesFilters = (state) => state.products.winesFilters;
export const selectCurrentWines = (state) => state.products.currentWines;
export const selectCountryFilter = (state) => state.products.filter;
export const selectAllFavorites = (state) => state.products.favorites;

export const selectAllRegions = (state) => state.products.regions;
export const selectAllWinerys = (state) => state.products.winerys;

export const {
  orderByName,
  setCurrentWines,
  cleanUpState,
  cleanUpStateFilters,
  clearOneWine,
  getRegiones,
  getWinerys,
  setWinerys,
  setFavorites,
  getFavorites
} = productsSlice.actions;

export const selectAllWinesStatus = (state) => state.products.allWinesStatus;
export const selectAllWinesCountryStatus = (state) => state.products.allWinesCountryStatus;
export const selectAllDisabedWinesStatus = (state) => state.products.allDisabledWinesStatus;
export const selectAllWineTypesStatus = (state) => state.products.allWineTypesStatus;
export const selectOneWineStatus = (state) => state.products.oneWineStatus;
export const selectOneFavoriteStatus = (state) => state.products.oneFavoriteStatus;
export const selectAllFavoritesStatus = (state) => state.products.allFavoritesStatus;
