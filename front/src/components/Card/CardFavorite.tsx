import Link from "next/link";
import Image from 'next/image'

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { addNewProduct, selectDisplay, displayCart } from "../../features/products/cartSlice";
import { deleteFavorite, setFavorites } from "../../features/products/productsSlice";
import { selectAllUsers } from "../../features/comments/commentsSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export default function CardFavorite({ wine }) {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const display = useSelector(selectDisplay)
    const router = useRouter()
    const { user } = useUser()
    const users = useSelector(selectAllUsers)
    const userExistente = users.find(u => u.email === user?.email)
    const currentUser = userExistente?.id
    const productCurrent = wine.id?.toString()

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
        return (<>{texto}<small>{desc[1]}</small></>);
    }

    useEffect(() => {
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return null;
    }

    async function eliminarfavoritos() {
        await dispatch(deleteFavorite({ userId: currentUser, productId: productCurrent }))
        await dispatch(setFavorites(wine))
        alert('Realizado')
    }
    return (
        <>
            <div key={wine.id} className="flex flex-row justify-center mt-14 sm:mt-24 sm:ml-0">
                <div className="grow w-2/3 max-w-xl	 self-center">
                    <h3 className="font-poppins poppy uppercase text-sm sm:text-base sm:tracking-widest">{wine.winery} - {wine.year}</h3>
                    <Link href={`/products/${wine.id}`}>
                        <h2 className="font-playfair font-bold choco text-2xl sm:text-4xl leading-10 mt-2 sm:mt-4 tracking-wide">
                            {wine.wine}
                        </h2>
                    </Link>
                    <p className="font-poppins bore font-extralight	text-sm sm:text-lg mt-4 mb-2 max-w-prose sm:pl-2 sm:pr-2">
                        <WineDescription text={wine.description} />
                    </p>
                    <button className="rounded boton" onClick={() => {
                        dispatch(addNewProduct(wine))
                    }}>TASTE IT</button>
                    {user && (<button onClick={eliminarfavoritos} className="rounded boton">
                        ❌
                    </button>)}
                </div>
                <div className="w-1/3 flowers2 no-flex">
                    <Link href={`/products/${wine.id}`}>
                        <img src={wine.image} alt={wine.wine} className="object-scale-down h-4/12" />
                    </Link>
                </div>
            </div>
        </>
    );
}
