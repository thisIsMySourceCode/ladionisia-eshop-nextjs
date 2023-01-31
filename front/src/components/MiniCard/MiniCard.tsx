import Link from "next/link";
import { useEffect, useState } from "react";
import FAIcon from "../FAIcon";
import {
  selectCart,
  minusOneProduct,
  plusOneProduct,
  minusAllProducts,
  selectDisplay,
} from "../../features/products/cartSlice";
import { useAppDispatch } from "../../app/store";
import GenericModal from "../Modals/GenericModal";


export default function MiniCard({ wine }) {
    const [isLoading, setIsLoading] = useState(true);
    const [wineCounter, setWineCounter] = useState(1);
    const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [modalConfirmClear, setModalConfirmClear] = useState(false);

    const dispatch = useAppDispatch()

    const subtotalCalculation = (quantity, price) => quantity * price

    const counterPlus = () => dispatch(plusOneProduct(wine.id))
    const counterLess = () => dispatch(minusOneProduct(wine.id))
    const removeAllProducts = () => dispatch(minusAllProducts(wine.id))

    useEffect(() => {
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return null;
    }

    return (
    <>
    <div className="flex bg-default border border-black rounded-3xl py-6 px-10">
      <div className="flex w-1/2 ">
        <img src={wine.product.image} alt={wine.product.wine} height={40} width={50} />
        <span className="lfpdesc block my-auto">
          <p className="my-auto text-2xl font-semibold px-6 font-body text-black">
            {wine.product.wine}
          </p>
          <p className="my-auto text-xl font-medium px-6 font-body mt-2 text-gray-700 ">
            {wine.product.winery} - {wine.product.year}
          </p>
        </span>
      </div>
      <div className="flex w-1/2 justify-end space-x-16">
        <div className="flex lfpunits">
          <p className="my-auto text-3xl font-bold text-black">{wine.quantity}</p> 
          <span className="block my-auto">
            <button className="w-full" onClick={() => wine.quantity < wine.product.stock ? counterPlus() : null}>
              <FAIcon className="text-black active:text-gray-400" type="solid" size="md" name="caret-up" />
            </button>
            <button className=" w-full" onClick={() => wine.quantity > 1  ?  counterLess() :  setModalConfirmClear(true)}>
              <FAIcon className="text-black active:text-gray-400" type="solid" size="md" name="caret-down" />
            </button>
          </span>
        </div>
        <p className="lfpprice my-auto text-2xl font-semibold px-4 text-black ">${subtotalCalculation(wine.quantity, wine.product.price)}</p>
        <button className="" onClick={() => setModalConfirmClear(true)}>
          <FAIcon className="text-black" type="light" size="lg" name="trash-can" />
        </button>
      </div>
    </div>
    <GenericModal
      display={modalConfirmClear}
      setDisplay={setModalConfirmClear}
      title='Remove products'
      onClickAccept={() => removeAllProducts()}
      acceptBtnLabel="Yes"
      message={`Are you sure you want to remove all "${wine.product.wine}" from your cart?`}
    />
    </>
  )
}