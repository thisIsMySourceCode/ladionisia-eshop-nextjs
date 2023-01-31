import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { selectAllFavorites, selectAllFavoritesStatus, getFavorite, getFavorites, setWinerys } from "../../features/products/productsSlice";
import { EStateGeneric, filterWines } from "../../utils/general";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import CardFavorite from "../../components/Card/CardFavorite";
import { useUser } from "@auth0/nextjs-auth0/client";
import { AllUsersStatus, getAllUsersDb, selectAllUsers } from "../../features/comments/commentsSlice";
import Image from "next/image";
import Link from "next/link";
import { selectFilters } from "../../features/generalSlice";
import Filters from "../../components/Filters/Filters";
import DontHaveFavorites from "../../components/Errors/DontHaveFavorites";



<title>Favorite</title>
export default function index() {
  const filters = useSelector(selectFilters)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const favorites = useSelector(selectAllFavorites)
  const favoritesStatus = useSelector(selectAllFavoritesStatus)
  const usersStatus = useSelector(AllUsersStatus)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21;
  const { user } = useUser()
  const users = useSelector(selectAllUsers)
  const userExistente = users.find(u => u.email === user?.email)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [filteredWines, setFilteredWines] = useState(favorites);
  const currentItems = filteredWines.slice(indexOfFirstItem, indexOfLastItem)
  const onPageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const opencart = (e) => {
    e.preventDefault()
    document.getElementById("opencart").click();
  }


  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (usersStatus === EStateGeneric.IDLE) {
          await dispatch(getAllUsersDb());
        }
        if (favoritesStatus === EStateGeneric.IDLE) {
          userExistente ? await dispatch(getFavorites(userExistente?.favorites)) : null
        }
      }
    }
    fetchData()
    setFilteredWines(filterWines(favorites, filters));
    dispatch(setWinerys(filterWines(favorites, filters)))
  }, [favoritesStatus, filters, favorites, users, userExistente])
  return (

    <>
      <NavBar setCurrentPage={setCurrentPage}></NavBar>
      <div id="passion-for-wine" className="
  main-body
  home
  mb-8
  m-auto
  max-w-screen-xl
  pb-28
  sm:rounded-2xl	
">




        <Link href="/products" >
          <div className="w-12 h-12 pt-4 pl-4 opacity-50 cursor-pointer">
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 219.151 219.151">
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
        </Link>

        <div className="pt-16 iconitos">
          <Image width={36} height={36} onClick={opencart} src="/assets/cart.svg" />
        </div>


        <Filters setCurrentPage={setCurrentPage} />
        {favorites && favorites[0]?.error && (<h1>PRODUCT NOT FOUND</h1>)}
        {favorites && !favorites[0]?.error && filteredWines.length > 0 &&
          <>
            {
              currentItems.map((wine) => (
                <CardFavorite key={wine.id} wine={wine}></CardFavorite>
              ))
            }
          </>
        }
        {!filteredWines.length &&
          <>
            <h1>YOU DONT HAVE FAVORITES</h1>
          </>
        }

        {filteredWines.length > 0 &&

          <Pagination
            onPageChange={onPageChange}
            wines={filteredWines}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }


      </div><Footer /></>)
};
