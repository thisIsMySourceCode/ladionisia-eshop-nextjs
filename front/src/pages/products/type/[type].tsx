import { useState } from "react";
import Card from "../../../components/Card/Card"
import NavBar from "../../../components/Navbar/NavBar"
import Pagination from "../../../components/Pagination"
import Footer from "../../../components/Footer/Footer";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { getAllWineTypes, selectAllWineTypes, selectAllWineTypesStatus, setWinerys } from "../../../features/products/productsSlice";
import { EStateGeneric, filterWines } from "../../../utils/general";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Image from "next/image";
import Filters from "../../../components/Filters/Filters";
import Circles from '../../../components/Circles/Circles'

import { useUser } from '@auth0/nextjs-auth0/client';
import { selectFilters } from "../../../features/generalSlice";



export default function Reds({ }) {
  const router = useRouter()
  const { type } = router.query;
  const dispatch = useAppDispatch()
  const wines = useSelector(selectAllWineTypes)
  const filters = useSelector(selectFilters)
  const winesStatus = useSelector(selectAllWineTypesStatus)
  const [filteredWines, setFilteredWines] = useState(wines);

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
        if (winesStatus === EStateGeneric.IDLE)
          await dispatch(getAllWineTypes(type.toString()));
      }
    }
    fetchData()
    setFilteredWines(filterWines(wines, filters));
    dispatch(setWinerys(filterWines(wines, filters)))
  }, [type, wines, filters])

  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useUser()

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredWines.slice(indexOfFirstItem, indexOfLastItem);
  const onPageChange = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  return (
<><title>La Dionisia - Wines</title>
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
 <div className="pb-8"></div>
 <Filters setCurrentPage={setCurrentPage}/>
 <div className="pb-20"></div>

 {wines && wines[0]?.error && (<h1>PRODUCT NOT FOUND</h1>)}
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
      <h1>PRODUCTS NOT FOUND</h1>
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
</>)}
