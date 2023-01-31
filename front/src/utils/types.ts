// export interface IProduct {
//   id?: number;
//   winery: string;
//   wine: string;
//   rating: number;
//   country: string;
//   region: string;
//   image: string;
//   description: string;
//   type: string;
//   year: number;
//   disabled: boolean | string;
//   featured: boolean | string;
//   onSale: boolean | string;
//   totalSalesCurrent: number;
//   stock: number;
// }

export interface IProduct {
  id?: number;
  winery?: string;
  wine?: string;
  rating?: number;
  country?: string;
  region?: string;
  image?: string;
  description?: string;
  type?: string;
  year?: number;
  disabled?: boolean | string;
  featured?: boolean | string;
  onSale?: boolean | string;
  totalSalesCurrent?: number;
  stock?: number;
}
export interface IProductCart {
  id: number;
  product: IProduct;
  quantity: number;
}