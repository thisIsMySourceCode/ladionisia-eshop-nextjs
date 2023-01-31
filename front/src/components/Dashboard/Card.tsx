import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/store";
import { deleteWine, getAllDisabledWines, getAllWines, selectAllDisabedWinesStatus, updateWine } from "../../features/products/productsSlice";
import GenericModal from "../Modals/GenericModal";
import { EStateGeneric } from "../../utils/general";
import { useSelector } from "react-redux";
import FAIcon from "../FAIcon";

export default function Card({ wine, handleEditProduct }) {
  const dispatch = useAppDispatch()
  const winesDisabledStatus = useSelector(selectAllDisabedWinesStatus)
  const [displayModalConfirmDelete, setDisplayModalConfirmDelete] = useState(false);
  const [displayModalConfirmDeleteDisabled, setDisplayModalConfirmDeleteDisabled] = useState(false);
  const router = useRouter()


    const [isLoading, setIsLoading] = useState(true);
    const { user } = useUser();
    function isUser(obj: any): obj is { '/roles': string[] } {
        return '/roles' in obj;
    }
    useEffect(() => {
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return null;
    }

    const disableProduct = async () => {
      const product = {
        id: wine.id,
        disabled: true,
        image: ""
      }
      const result = await dispatch(updateWine(product))
      if (updateWine.fulfilled.match(result)) /* alert('Product Deleted') */
      console.log(result)
    }

    // en caso de que queramos eliminar el producto ya definitivamente:
    async function deleteProduct() {
      const result = await dispatch(deleteWine(wine.id))
      if (deleteWine.fulfilled.match(result)) /* alert('Product Deleted for ever') */
      console.log(result)
    }
    if (user) {

        const usuario = isUser(user) ? user[`/roles`] : [];

        return (
            <>
                <div className="flex flex-col items-center w-4/12 text-center relative" key={wine.id}>
                    {user && usuario.includes('administrador') && (
                        <>
                            <div className="absolute right-10 top-0">
                              <button onClick={() => handleEditProduct(wine)}>
                                <span>
                                  <FAIcon
                                    size="lg"
                                    type="light"
                                    name="pen-to-square"
                                  />
                                </span>
                              </button>
                            </div>
                            {wine.disabled &&
                                <div className="absolute right-0 top-0">
                                  <button 
                                    onClick={() =>  setDisplayModalConfirmDelete(true)}
                                  >
                                    <span>
                                      <FAIcon
                                        size="lg"
                                        type="light"
                                        name="trash"
                                      />
                                    </span>
                                  </button>
                                </div>
                            }
                            {!wine.disabled &&
                              <div className="absolute right-0 top-0">
                                <button
                                  onClick={() =>  setDisplayModalConfirmDeleteDisabled(true)}
                                >
                                  <span>
                                    <FAIcon
                                      size="lg"
                                      type="light"
                                      className="text-red-500"
                                      name="trash-can"
                                    />
                                  </span>
                                </button>
                              </div>
                            }
                        </>
                    )}
                    <Link href={`/dashboard/products/${wine.id}`}>
                        <div className="flex flex-col items-center text-center m-7 ">
                            <img src={wine.image} alt={wine} className="object-scale-down" style={{ maxHeight: 300 }} />
                            <h2 className="font-poppins lucho">{wine.wine} || ${wine.price}</h2>
                            <h3 className="font-poppins lucho">stock:{wine.stock}</h3>
                        </div>
                    </Link>
                </div>
                <GenericModal 
                  display={displayModalConfirmDeleteDisabled}
                  setDisplay={setDisplayModalConfirmDeleteDisabled}
                  title='Disable product'
                  onClickAccept={disableProduct}
                  acceptBtnLabel="Yes, disable"
                  message={`You're about to disable the product "${wine.wine}", are you sure you want to continue? 
                    You can later enable it again in the "Disabled products" section above.
                  `}
                />
                <GenericModal 
                  display={displayModalConfirmDelete}
                  setDisplay={setDisplayModalConfirmDelete}
                  title='Delete product'
                  onClickAccept={deleteProduct}
                  acceptBtnLabel="Yes, delete"
                  message={`You're about to delete the product "${wine.wine}", are you sure you want to continue? 
                  `}
                />
            </>
        )
    }

}
