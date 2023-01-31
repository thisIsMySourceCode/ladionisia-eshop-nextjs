import { useState } from "react";
import NavBar from "../../../components/Navbar/NavBar";
import Pagination from "../../../components/Pagination";
import Card from "../../../components/Card/Card";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { selectAllWines, selectAllWinesStatus, getAllWinesByContry, selectAllWinesByContry, selectAllWinesCountryStatus, selectCurrentWines, getRegiones, setWinerys } from "../../../features/products/productsSlice";
import { useEffect } from "react";
import { EStateGeneric, filterWines } from "../../../utils/general";
import { useRouter } from "next/router";
import Footer from "../../../components/Footer/Footer";
import Image from "next/image";
import Filters from "../../../components/Filters/Filters";
import Circles from '../../../components/Circles/Circles'
import { useUser } from '@auth0/nextjs-auth0/client';
import { selectFilters } from "../../../features/generalSlice";
import NotFound from "../../../components/Errors/NotFound";

export default function index({ }) {
  const { user } = useUser()
  const filters = useSelector(selectFilters)
  const router = useRouter()
  const { filter } = router.query;
  const dispatch = useAppDispatch()
  const winesCountry = useSelector(selectAllWinesByContry)
  const winesCountryStatus = useSelector(selectAllWinesCountryStatus)
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredWines, setFilteredWines] = useState(winesCountry);
  const itemsPerPage = 21;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
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
        if (winesCountryStatus === EStateGeneric.IDLE) {
          await dispatch(getAllWinesByContry(filter.toString()));
          await dispatch(getRegiones());
        }
      }
    }
    fetchData()
    setFilteredWines(filterWines(winesCountry, filters));
    dispatch(setWinerys(filterWines(winesCountry, filters)))
  }, [filter, winesCountry, filters])

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
  <Filters setCurrentPage={setCurrentPage}/>
  {winesCountry && winesCountry[0]?.error && (<h1>PRODUCT NOT FOUND</h1>)}
        {filteredWines.length > 0 &&
          <>
            {
              currentItems.map((wine) => (
                <Card key={wine.id} wine={wine}></Card>
              ))
            }
          </>
        }
        {!filteredWines.length &&
           <NotFound/>
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

</div>
<Footer/>    
</>    
)}
