
import { useState } from "react";
import NavBar from '../../components/Navbar/NavBar';
import Circles from '../../components/Circles/Circles'

import Pagination from "../../components/Pagination";
import Card from "../../components/Card/Card";
import { useAppDispatch } from "../../app/store";
import { useSelector } from "react-redux";
import { getAllWines, selectAllWines, selectAllWinesStatus, selectAllWinesCountryStatus, setWinerys } from "../../features/products/productsSlice";
import { useEffect } from "react";
import { EStateGeneric, filterWines } from "../../utils/general";
import { useRouter } from "next/router";
import Footer from "../../components/Footer/Footer";
import Filters from "../../components/Filters/Filters";
import Types from "../../components/Types/Types";
import { selectFilters } from "../../features/generalSlice";
import NotFound from "../../components/Errors/NotFound";

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";



export default function index() {
  const filters = useSelector(selectFilters)
  const { user } = useUser()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const wines = useSelector(selectAllWines)
  const winesStatus = useSelector(selectAllWinesStatus)
  const winesCountryStatus = useSelector(selectAllWinesCountryStatus)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // console.log(wines[0].error)
  const [filteredWines, setFilteredWines] = useState(wines);
  const currentItems = filteredWines.slice(indexOfFirstItem, indexOfLastItem)
  const onPageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const opencart = (e) => {
    e.preventDefault()
    document.getElementById("opencart").click();  
  }
  const openfav = (e) => {
    e.preventDefault()
    document.getElementById("openfav").click();  
  }



  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        if (winesStatus === EStateGeneric.IDLE) {
          await dispatch(getAllWines());
        }
      }
    }
    fetchData()
    setFilteredWines(filterWines(wines, filters));
    dispatch(setWinerys(filterWines(wines, filters)))
  }, [winesStatus, filters, wines])
  return (
<>
<NavBar setCurrentPage={setCurrentPage}></NavBar>
<div id="passion-for-wine" className="
  main-body
  home
  mb-8
  m-auto
  max-w-screen-xl
  pb-24
  sm:rounded-2xl	
pt-28
">


<div className="iconitos">
<Image width={36} height={36} onClick={opencart} src="/assets/cart.svg" />
{user && 
<div className="ml-6 float-right">
<Image width={36} height={36} onClick={openfav} src="/assets/heart.svg" />
</div>
}
</div>


<Circles/>


<div className="mt-4 mb-10">
<Filters setCurrentPage={setCurrentPage}/>
</div>





  {wines && wines[0]?.error && (<h1>PRODUCT NOT FOUND</h1>)}
  {wines && !wines[0]?.error && filteredWines.length > 0 &&
    <>
      {
        currentItems.map((wine) => (
          <Card key={wine.id} wine={wine}></Card>
        ))
      }
    </>
  }
  {!filteredWines.length &&
    <>
      <h1>PRODUCTS NOT FOUND</h1>
    </>
  }

{filteredWines.length > 0 && 

<div className="w-64 m-auto mb-8 overflow-hidden grid-cols-3	"><Pagination
    onPageChange={onPageChange}
    wines={filteredWines}
    itemsPerPage={itemsPerPage}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  /></div>
}
</div><Footer/>
</>)};
