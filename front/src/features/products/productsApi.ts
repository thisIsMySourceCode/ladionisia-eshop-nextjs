import axios from "axios";
import { IProduct } from "../../utils/types";

export const getAllProducts = () => axios(`${process.env.RESTURL_PRODUCTS}/products`)
export const getAllDisabledProducts = () => axios(`${process.env.RESTURL_PRODUCTS}/products/disabled`)
export const getAllProductTypes = (type: string) => axios(`${process.env.RESTURL_PRODUCTS}/products/wineTypes/${type}`)
export const getOneProductById = (id: string) => axios(`${process.env.RESTURL_PRODUCTS}/products/${id}`)
export const getAllProductsByContry = (contry: string) => axios(`${process.env.RESTURL_PRODUCTS}/products/country/${contry}`)
export const getAllProductsByRegion = (region: string) => axios(`${process.env.RESTURL_PRODUCTS}/products/region/${region}`)
export const getAllProductsByName = (name: string) => axios(`${process.env.RESTURL_PRODUCTS}/products?wine=${name}`)
//http://localhost:3001/sendEmail

export const createOneProduct = (product: IProduct) => axios.post(
  `${process.env.RESTURL_PRODUCTS}/products`,
  product,
  { headers: { 'Content-Type': 'multipart/form-data' } }
)

export const updateOneProduct = (product: IProduct) => axios.put(
  `${process.env.RESTURL_PRODUCTS}/products/${product.id}`,
  product,
  { headers: { 'Content-Type': 'multipart/form-data' } }
)
export const deleteOneProduct = (id: string) => axios.delete(`${process.env.RESTURL_PRODUCTS}/products/delete/${id}`)

//↓↓↓↓↓↓↓↓↓↓↓↓↓↓ todo lo relacionado a fovorites ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

export const getAllFavoritesApi = (userId) => axios(`${process.env.RESTURL_PRODUCTS}/users/favorite/${userId}`)
export const postFavorite = (userId, product) => axios.patch(`${process.env.RESTURL_PRODUCTS}/users/favorite/${userId}`,
  {product: product},
)
export const deleteFavoriteApi = (userId, productId) => axios.delete(`${process.env.RESTURL_PRODUCTS}/users/favorite/${userId}?productId=${productId}`)
export const deleteAllFavoritesApi = (userId) => axios.patch(`${process.env.RESTURL_PRODUCTS}/users/favorites/delete/${userId}`) 