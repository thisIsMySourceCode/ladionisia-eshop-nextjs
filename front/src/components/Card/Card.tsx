import Link from "next/link";
import Image from 'next/image'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { addNewProduct, selectDisplay, displayCart } from "../../features/products/cartSlice";
import { createFavorite, getFavorite } from "../../features/products/productsSlice";
import { AllUsersStatus, getAllUsersDb, selectAllUsers } from "../../features/comments/commentsSlice";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { EStateGeneric } from "../../utils/general";
import { registerUser } from "../../features/comments/commentsApi";

export default function Card({ wine }) {
  const { user } = useUser();
  const router = useRouter()
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const display = useSelector(selectDisplay)
  const usersStatus = useSelector(AllUsersStatus)
  const users = useSelector(selectAllUsers)
  const userExistente = users.find(u => u.email === user?.email)
  const currentUser = userExistente?.id


  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (usersStatus === EStateGeneric.IDLE) {
          await dispatch(getAllUsersDb());
        }
      }
    }
    fetchData()
  }, [users])

  const Price = ({ amount }) => {
    let price = (amount < 1) ? 100 : amount
    let entero = Math.trunc(price);
    let decimal = "" + (price - entero) * 100
    decimal = ("00" + decimal).slice(-2);
    return (<><i className="-mt-8 "><small>$</small></i> {entero}<small><sup>{decimal}</sup></small></>);
  }

  const WineDescription = ({ text }) => {
    let texto = "" + text;
    const desc = texto.split("(")
    texto = desc[0]
    desc[1] = (desc[1] == "") ? "" : "(" + desc[1]
    return (<>{texto}</>); // <small>{desc[1]}</small>
  }
  async function añadirfavoritos() {
    if (user) {
      try {
        await registerUser(user)
      } catch (error) {
        console.log(error.message);
      }
    }
    dispatch(createFavorite({ userId: currentUser, product: wine }))
    alert('Agregado')
  }
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return null;
  }
  return (
    <>
      <div key={wine.id} className="flex flex-row justify-center mt-14 sm:mt-24 sm:ml-0">
        <div className="grow w-2/3 max-w-xl	 self-center">
          <h3 className="font-poppins poppy uppercase text-sm sm:text-base sm:tracking-widest">{wine.winery} - {wine.year}</h3>
          <h2 className="cursor-pointer font-playfair font-bold choco text-xl sm:text-3xl leading-10 mt-2 sm:mt-4 tracking-wide">
            <Link href={`/products/${wine.id}`}>
              {wine.wine}
            </Link>
          </h2>
          <p className="max-w-sm	md:max-w-md wine-description font-poppins bore font-extralight text-sm sm:text-base mt-1 mb-3 max-w-prose sm:pl-2 sm:pr-2">
            <WineDescription text={wine.description} />
          </p><div className="spacer"></div>
          <button className="rounded boton" onClick={() => {
            dispatch(addNewProduct(wine))
          }}>TASTE IT</button>
          {user && (<button onClick={añadirfavoritos} className="rounded boton ml-4">
            ❤
          </button>)}

        </div>
        <div className="w-1/3 flowers2 no-flex cursor-pointer">
          <Link href={`/products/${wine.id}`}>

            <img src={wine.image} alt={wine.wine} className="object-scale-down h-4/12" />
          </Link>

        </div>
      </div>



    </>
  );
}
