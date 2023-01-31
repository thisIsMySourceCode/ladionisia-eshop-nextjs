import NavBar from '../../components/Navbar/NavBar';
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { clearOneWine, createFavorite, deleteAllFavorites, getOneWine, selectOneWine, selectOneWineStatus, } from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { EStateGeneric } from "../../utils/general";
import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
import Comments from "../../components/Comments/Comments";
import { useUser } from "@auth0/nextjs-auth0/client";
import { selectAllUsers } from "../../features/comments/commentsSlice";
import Image from "next/image";
import { addNewProduct } from "../../features/products/cartSlice";

export default function Product() {
  const { user } = useUser();
  const router = useRouter()
  const dispatch = useAppDispatch()
  const wine = useSelector(selectOneWine)
  const wineStatus = useSelector(selectOneWineStatus)
  const users = useSelector(selectAllUsers)
  const { id } = router.query
  const userExistente = users.find(u => u.email === user?.email)
  const currentUser = userExistente?.id

  const opencart = (e) => {
    e.preventDefault()
    document.getElementById("opencart").click();  
  }
  const openfav = (e) => {
    e.preventDefault()
    document.getElementById("openfav").click();  
  }


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



  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (wineStatus === EStateGeneric.IDLE) {
          await dispatch(getOneWine(id?.toString()));
        }
      }
    }
    fetchData()
    return () => {
      dispatch(clearOneWine());
    }
  }, [id])
  function añadirfavoritos() {
    dispatch(createFavorite({ userId: currentUser, product: wine }))
    alert("New Favorite added")
  }

  return (
    <>
<NavBar ></NavBar>
<div id="passion-for-wine" className="
  main-body
  home
  mb-8
  m-auto
  max-w-screen-xl
  pb-28
  sm:rounded-2xl
  pt-24
">



<a href="/products">
<div className="zz w-12 h-12 pt-4 pl-4 opacity-50 cursor-pointer">
<svg fill="#000000"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 219.151 219.151">
<g>
<path d="M109.576,219.151c60.419,0,109.573-49.156,109.573-109.576C219.149,49.156,169.995,0,109.576,0S0.002,49.156,0.002,109.575
		C0.002,169.995,49.157,219.151,109.576,219.151z M109.576,15c52.148,0,94.573,42.426,94.574,94.575
		c0,52.149-42.425,94.575-94.574,94.576c-52.148-0.001-94.573-42.427-94.573-94.577C15.003,57.427,57.428,15,109.576,15z"/>
<path d="M94.861,156.507c2.929,2.928,7.678,2.927,10.606,0c2.93-2.93,2.93-7.678-0.001-10.608l-28.82-28.819l83.457-0.008
		c4.142-0.001,7.499-3.358,7.499-7.502c-0.001-4.142-3.358-7.498-7.5-7.498l-83.46,0.008l28.827-28.825
		c2.929-2.929,2.929-7.679,0-10.607c-1.465-1.464-3.384-2.197-5.304-2.197c-1.919,0-3.838,0.733-5.303,2.196l-41.629,41.628
		c-1.407,1.406-2.197,3.313-2.197,5.303c0.001,1.99,0.791,3.896,2.198,5.305L94.861,156.507z"/>
</g>
</svg>
</div>
</a>

<div className="pt-4 iconitos">
<Image width={36} height={36} onClick={opencart} src="/assets/cart.svg" />
{user && 
<div className="ml-6 float-right">
<Image width={36} height={36} onClick={openfav} src="/assets/heart.svg" />
</div>
}
</div>











<div className="w-2/3 float-right pt-4">
          <p className="text-xl font-poppins text-price-color">{wine.winery}</p>
          <p className="text-4xl font-playfair text-font-color" ><b>{wine.wine}</b></p>
          <p className="text-4xl font-playfair text-gray-600 pt-4 pb-4 price">
            <span className="text-price-color">
              <Price amount={wine.price} />
            </span>
            <span className="font-poppins w-12 text-2xl ml-2 mt-4 pts">{wine.rating}<small>&nbsp;pts.</small></span>
          </p>
          <p className="text-lg font-bodony text-gray-600 wine-description">
            <WineDescription text={wine.description} />
          </p>




          <button className="rounded boton" onClick={() => {
            dispatch(addNewProduct(wine))
          }}>TASTE&nbsp;IT</button>
          {user && (<button onClick={añadirfavoritos} className="ml-4 rounded boton">
            ❤
          </button>)}
        </div>

        <div className="w-1/3 h-96 flex justify-center items-center bg-product">
          <img src={wine.image} alt={wine.wine} className="object-scale-down h-4/12" />
        </div>
        <Comments />
        </div>

        <Footer />
    </>)
}