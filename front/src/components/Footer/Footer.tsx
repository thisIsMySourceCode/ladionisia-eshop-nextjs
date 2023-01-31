import Script from 'next/script'
import Image from 'next/image';
import Link from "next/link";
import style  from "./footer.module.css";
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Cart from "../Cart/Cart";
import { selectCart, selectDisplay, displayCart } from "../../features/products/cartSlice";
import { useEffect, useState, useCallback,useLayoutEffect,useRef } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/store"
import { getAllWinesByName } from "../../features/products/productsSlice"
import { useSelector } from "react-redux";
import { persistor } from '../../app/store';



export default function Footer() {

  
  const 
    [hasMounted, setHasMounted] = useState(false),
    legalAge = localStorage.getItem('age')
    if (!legalAge) {
      let modalAge = document.getElementById('age')
      if (modalAge !== null) {
          modalAge.style.display = 'none'
      }
    }
    
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
    
    const { user } = useUser()
    const [mounted, setMounted] = useState(false);
    const [search, setSearch] = useState('')
    const router = useRouter();
    const display = useSelector(selectDisplay)
    const cart = useSelector(selectCart)
    const dispatch = useAppDispatch()

    const goTop = (e) => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    const closeAge = (e) => {
      e.preventDefault()
      let modalAge = document.getElementById('age')
      if (modalAge !== null) {
          modalAge.style.display = 'none'
      }
      localStorage.setItem('age', '18+')
    }
    const access = (e) => {
      e.preventDefault()
      const accessicon = document.getElementById('userwayAccessibilityIcon')
      if  ( accessicon !== null) {
            document.getElementById("myNav").style.width = "0%";
            accessicon.click()
      }
    }

    const closeNav = (e) => {
      e.preventDefault()
      document.getElementById("myNav").style.width = "0%";
    }

    const goHome = (e) => {
      if ( e.target.href == window.location) {
           e.preventDefault()
           document.getElementById("myNav").style.width = "0%";
      }
    }
  

    useEffect(() => {
      setTimeout(() => {
       const legalAge = localStorage.getItem('age')
        if ( legalAge ) {
          let modalAge = document.getElementById('age')
          if (modalAge !== null) {
              modalAge.style.display = 'none'
          }
        }
      },5)
      setHasMounted(true);



      setMounted(true)
      const unsubscribe = persistor.subscribe(() => {
        console.log('Local storage updated with latest state: ', cart);
      });
      return () => {
        unsubscribe();
      }
    }, [])
  




return (
<>

<div id="myNav" className="overlay">
        <a  accessKey="x" href="#" className="closebtn" onClick={closeNav}>&times;</a>
        <div className="overlay-content">





        <div className="flex justify-center">
       <div className="grid grid-cols-1 xl:grid-cols-6 text-center gap-x-6 gap-y-4">
       <a accessKey="h" id="opengohome" href="/home" onClick={goHome}>Home</a>  
       {!user && <a href="/api/auth/login">Login</a>}
       {user && <a href="/api/auth/logout" onClick={handleCookieLogout}>Logout</a>}
       {user && <a id="openfav" href='/favorite'>Favorites</a>}


       <a href="#" id="opencart" onClick={() => dispatch(displayCart())}>Cart</a> 





       <a href="/">Video</a>
       <a href="#" onClick={access}>Accesibility</a>



       </div>
        </div>



        <br/>
        <p>
        <a href="/products" >All Wines</a>
        </p>
        <div className="flex justify-center">
       <div className="grid grid-cols-1 xl:grid-cols-5	text-center country  gap-x-7 gap-y-4">
          <a href="/products/type/reds">Red</a>
          <a href="/products/type/whites">Whites</a>
          <a href="/products/type/rose">Rose</a>
          <a href="/products/type/sparkling">Sparkling</a>
          <a href="/products/type/dessert">Dessert</a>
          </div>
        </div>

<br/>
        <div className="flex justify-center">
       <div className="grid grid-cols-1 xl:grid-cols-4	text-center country  gap-x-14 gap-y-4">
          <a href="/about">About</a>
          <a href="/shipping">Shipping</a>
          <a href="/newsletter">Newsletter</a>
          <a href="/privacy">Privacy</a>
        </div>
        </div>

<h2>Contries</h2>
<div className="flex justify-center">
 <div className="grid grid-cols-1 xl:grid-cols-8	text-left country gap-x-16 gap-y-4">
                <a href="/products/filters/Argentina">Argentina</a>
                <a href="/products/filters/Australia">Australia</a>
                <a href="/products/filters/Austria">Austria</a>
                <a href="/products/filters/Brazil">Brazil</a>
                <a href="/products/filters/Canada">Canada</a>
                <a href="/products/filters/Chile">Chile</a>
                <a href="/products/filters/France">France</a>
                <a href="/products/filters/Georgia">Georgia</a>
                <a href="/products/filters/Germany">Germany</a>
                <a href="/products/filters/Greece">Greece</a>
                <a href="/products/filters/Hungary">Hungary</a>
                <a href="/products/filters/Israel">Israel</a>
                <a href="/products/filters/Italy">Italy</a>
                <a href="/products/filters/Moldova">Moldova</a>
                <a href="/products/filters/New Zealand">New Zealand</a>
                <a href="/products/filters/Portugal">Portugal</a>
                <a href="/products/filters/Romania">Romania</a>
                <a href="/products/filters/Slovenia">Slovenia</a>
                <a href="/products/filters/South Africa">South Africa</a>
                <a href="/products/filters/Spain">Spain</a>
                <a href="/products/filters/Switzerland">Switzerland</a>
                <a href="/products/filters/Turkey">Turkey</a>
                <a href="/products/filters/United States">United States</a>
                <a href="/products/filters/Uruguay">Uruguay</a>
              </div>
              </div>



        </div>
      </div>


      <Cart wines={cart}/>


<div id="age" className={style.modalage}>
  <p>You must be of legal drinking age to access this Site.</p> 
  <button onClick={closeAge}>Accept</button>
</div>
<footer className={`${style.footer} text-center sm:text-left`}>
  <div className="mx-6 py-10 text-center sm:text-left">
    <div className="grid grid-1 xs:grid-cols-2 sm:grid-cols-3 gap-8">
      <div className="grid place-items-center mt-4 ">
        <div onClick={goTop} className="-ml-3 w-32 h-32 relative opacity-70 cursor-pointer">
          <Image layout="fill" src="/assets/logonav.svg"/>
        </div>
      </div>
      <div className="">
        <h6 className="uppercase font-semibold mb-4 flex justify-center sm:justify-start">
          Contact
        </h6>
        <div className="flex items-center justify-center sm:justify-start mb-4">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="home"
            className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path fill="currentColor"
              d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z">
            </path>
          </svg>
          <span className={style.contactinfo}>New York, NY10012, US</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start mb-4">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope"
            className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z">
            </path>
          </svg>
            <span className={style.contactinfo}>
              <a href="mailto:ladionisia@mail.com">
                <span className={style.spanLeft}>[</span>
                <span className="spanCenter">ladionisia@mail.com</span>
                <span className={style.spanRight}>]</span>
              </a>
          </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start mb-4">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="phone"
            className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z">
            </path>
          </svg>
          <span className={style.contactinfo}>
            <a href="telto:+0121262525522">
              <span className={style.spanLeft}>[</span>
              + 01 212 625 2552
              <span className={style.spanRight}>]</span>
            </a>
        </span>
        </div>
        <div className="flex items-center justify-center sm:justify-start">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="print"
            className="w-4 mr-4" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z">
            </path>
          </svg>
          <span className={style.contactinfo}>
            <a href="telto:+0121262525523">
              <span className={style.spanLeft}>[</span>
              + 01 212 625 2553
              <span className={style.spanRight}>]</span>
            </a>
          </span>
        </div>
      </div>
      <div>
        <h6 className="uppercase font-semibold mb-4 flex justify-center sm:justify-start">
        Links
        </h6>
        <div className={`${style.footlinks} sm:ml-0`}>
        <div className="mb-4">
          <Link href="/about">
            <a>
              <div className={style.footlink}>
                <span className={style.spanLeft}>[</span>
                About
                <span className={style.spanRight}>]</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/shipping">
            <a>
              <div className={style.footlink}>
                <span className={style.spanLeft}>[</span>
                Shipping &amp; Returns
                <span className={style.spanRight}>]</span>
              </div>
            </a>
          </Link>
        </div>
        <div className="mb-4">
          <Link href="/newsletter">
            <a>
              <div className={style.footlink}>
                <span className={style.spanLeft}>[</span>
                Newsletter
                <span className={style.spanRight}>]</span>
              </div>
            </a>
          </Link>
        </div>
        <div>
          <a href="#" onClick={access}>
            <div className={style.footlink}>
              <span className={style.spanLeft}>[</span>
              Accesibility
              <span className={style.spanRight}>]</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  <div className="text-center p-6">
    <span>© 2023 Copyright &nbsp;La Dionisia LLC</span>
    <Link href="/privacy">
      <a className="font-semibold privacy">Privacy Policy</a>
    </Link>
  </div>
</footer>
<Script src="/assets/access.js"/>
</>
)}
