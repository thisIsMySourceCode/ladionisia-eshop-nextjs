import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { useAppDispatch } from "../../../app/store";
import NewProductLogoBlack from "../../../assets/img/NewWineBlack.svg"
import NewProductLogoWhite from "../../../assets/img/NewWineWhite.svg"
import { setMaxPageNumLim, setMinPageNumLim } from "../../../features/generalSlice";
import { getAllWinesByName } from "../../../features/products/productsSlice";
import FAIcon from "../../FAIcon";

export default function Navbar({ handleNewProduct, ViewProducts, ViewProductsDisabled }) {
  const [search, setSearch] = useState('')
  const dispatch = useAppDispatch()
  
  function getWinesByName(e) {
    e.preventDefault(e)
    dispatch(getAllWinesByName(search))
    router.push({
      pathname: `/dashboard/products`
    },
      undefined,
      { shallow: true }
    );
    dispatch(setMaxPageNumLim(10))
    dispatch(setMinPageNumLim(0));
    setSearch('')
  }
  function handleInputName(e) {
    setSearch(e.target.value)
  }

  return (
        <nav className="w-full flex justify-between items-center bg-pagination-color my-2">
            <ul className="w-full flex justify-between pr-6">
                <li className="border border-transparent hover:border-gray-400 px-2 py-2 rounded-lg">
                  <button className="flex items-center" onClick={() => ViewProducts()}> 
                    <span>
                      <FAIcon
                        size="lg"
                        name="jug"
                       />
                    </span>
                    <span className="text-gray-500 font-medium text-lg my-auto ml-2">All Products</span>
                  </button>
                </li>
                <li className="hover:border hover:border-gray-400 px-2 py-2 rounded-lg">
                  <button className="flex items-center" onClick={() => ViewProductsDisabled()}> 
                    <span>
                      <FAIcon
                        size="lg"
                        type="light"
                        name="jug"
                       />
                    </span>
                    <span className="text-gray-500 font-medium text-lg my-auto ml-2">Disabled Products</span>
                  </button>
                </li>
                <li className="hover:border hover:border-gray-400 px-2 py-2 rounded-lg">
                  <button className="flex items-center" onClick={() => handleNewProduct()}> 
                    <span>
                      <FAIcon
                        size="lg"
                        type="light"
                        name="circle-plus"
                       />
                    </span>
                    <span className="text-gray-500 font-medium text-lg my-auto ml-2">New Product</span>
                  </button>
                </li>
            </ul>
            <form className="wine-search flex" onSubmit={(e) => { getWinesByName(e) }}>
              <input type="search" onChange={(e) => { handleInputName(e) }} value={search} placeholder="Search Wines" />
              <button>GO</button>
            </form>
        </nav>
    )
}
