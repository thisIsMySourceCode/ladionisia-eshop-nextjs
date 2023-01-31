import { useEffect, useState, useCallback, useLayoutEffect, useRef } from "react";
import axios from 'axios';
import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/store"
import { getAllWinesByName } from "../../features/products/productsSlice"
import { useSelector } from "react-redux";
import Image from "next/image";
import { persistor } from '../../app/store';
import { selectCart, selectDisplay, displayCart } from "../../features/products/cartSlice";
import { setFilters, setMaxPageNumLim, setMinPageNumLim } from "../../features/generalSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
function isUser(obj: any): obj is { '/roles': string[] } {
  return '/roles' in obj;
}
const Btn = () => {
  const { user } = useUser()
  if (user) {
    const usuario = isUser(user) ? user[`/roles`] : [];
    if (usuario.includes('administrador')) {
      return (
        <a href="/dashboard">Dashboard</a>
      )
    }
  }
}

const NavBar = ({ setCurrentPage }: any) => {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('')
  const router = useRouter();
  const cart = useSelector(selectCart)
  const dispatch = useAppDispatch()



  useEffect(() => {
    setTimeout(() => {
      window.onscroll = function () {
        let nav = document.getElementById("navbar");
        if (nav !== null) {
          let fija = nav.offsetTop;
          if (window.pageYOffset > fija) {
            nav.classList.add("fix");
          } else {
            nav.classList.remove("fix");
          }
        }
      }
    }, 5)



    setMounted(true)
    const unsubscribe = persistor.subscribe(() => {
      console.log('Local storage updated with latest state: ', cart);
    });
    return () => {
      unsubscribe();
    }
  }, [])
  const handleCookieLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.status === 200) {
        router.push("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  function getWinesByName(e) {
    e.preventDefault(e)
    dispatch(getAllWinesByName(search))
    router.push({
      pathname: `/products`
    },
      undefined,
      { shallow: true }
    );
    setCurrentPage(1)
    dispatch(setMaxPageNumLim(10))
    dispatch(setMinPageNumLim(0));
    setSearch('')
  }
  function handleInputName(e) {
    setSearch(e.target.value)
  }
  if (!mounted) return null
  function handleFilters(e) {
    const { value, name } = e.target;
    dispatch(setFilters({ [name]: value }));
  }
  const scores = [
    "100",
    "99-97",
    "96-94",
    "93-91",
    "90-under"
  ]
  const vintage = [
    "2010-Present",
    "2000-2009",
    "1980-1989",
    "1970-1979",
    "1960-1969",
    "1959-older",
  ]
  const countries = [
    'France',
    'Argentina',
    'Portugal',
    'South Africa',
    'Spain',
    'Italy',
    'Australia',
    'United States',
  ]

  const goContact = (e) => {
    e.preventDefault()
    let menu = document.getElementById('portableMenu')
    menu.style.display = 'none'
    document
      .querySelector('#contact')
      .scrollIntoView({ block: "start", behavior: "smooth" })
  }

  const goHome = (e) => {
    if (e.target.href == window.location || e.target.href === window.location + 'home') {
      e.preventDefault()
      let menu = document.getElementById('portableMenu')
      menu.style.display = 'none'
    }
  }

  const goMobile = (e) => {
    e.preventDefault()
    let menu = document.getElementById('portableMenu')
    document
      .querySelector('#portableMenu')
      .scrollIntoView({ block: "start", behavior: "smooth" })
    menu.style.display = 'block'
  }

  const closeMobile = (e) => {
    e.preventDefault()
    let menu = document.getElementById('portableMenu')
    menu.style.display = 'none'
  }

  const goProducts = (e) => {
    let menu = document.getElementById('portableMenu')
    menu.style.display = 'none'
    if (e.target.href == window.location) {
      e.preventDefault()
    }
  }


  const openNav = (e) => {
    e.preventDefault()
    let myNav = document.getElementById("myNav")
    if (myNav) {
      myNav.style.width = "100%";
    }
  }


  const openhome = (e) => {
    e.preventDefault()
    let myNav = document.getElementById("opengohome")
    if (myNav)
    {
      myNav.click();
    }
}


  return (
    <>
      <div id="top"></div>
      <div id="logo" className="cursor-pointer" onClick={openhome}></div>
      <div id="navbar" className="sticky pt-2">
        <div className="flex flex-wrap justify-center items-center mt-24">
          <div className="w-full max-w-screen-xl w-1/2 mitadsearch">
            <div className="searchbutton lucho font-poppins font-bold text-lg sm:text-xl m-auto max-w-screen-xl">
              <details className="ml-2">
                <summary accessKey="s" id="buscador">
                  <div className='searchicon cursor-pointer'>
                    <div className="w-7 h-12  relative">
                      <Image layout="fill" src="/assets/search.svg" />
                    </div>
                    <div className="searchword -mt-9 -ml-6">
                      SEARCH
                    </div>
                  </div>
                </summary>
                <form className="searchbuttondetails wine-search -mt-109 pl-8" onSubmit={(e) => { getWinesByName(e) }}>
                  <input type="search" onChange={(e) => { handleInputName(e) }} value={search} placeholder="Search Wines" />
                  <button>GO</button>
                </form>
              </details>
            </div>
          </div>
          <div className="w-full max-w-screen-xl w-1/2 mitadmenu">
            <div className="lucho font-poppins font-bold text-lg sm:text-xl text-right pr-1">
              <div accessKey="m" id="menubutton" className="menubutton cursor-pointer" onClick={openNav}>&#9776; MENU</div>
            </div>
          </div>
        </div>
      </div>
    </>)
}; export default NavBar;
