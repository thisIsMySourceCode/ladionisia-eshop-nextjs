import Image from 'next/image'
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import style from "../../assets/style/newsletter.module.css";
import React, { useEffect, useState } from 'react';
import { useUser } from "@auth0/nextjs-auth0/client";
import { useSelector } from "react-redux";
import { getAllUsersDb, selectAllUsers } from "../../features/comments/commentsSlice";
import { useAppDispatch } from "../../app/store";
import axios from "axios";
import { useRouter } from "next/router";

const Newsletter = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user } = useUser();
  const users = useSelector(selectAllUsers)
  const userExistente = users.find(u => u.email === user?.email)
  const [email, setEmail] = useState("")
  useEffect(() => {
    const emailfield = document.getElementById('emailfield')
    emailfield.focus()
    const fetchData = async () => {
      await dispatch(getAllUsersDb());
    }
    fetchData()
  }, [])
  const send = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${process.env.RESTURL_PRODUCTS}/sendEmail`,
      //aca debe ir el email de usuario loggeado
      {
        userEmail: email || userExistente?.email,
        newsletter: true
      })
    if (response.status === 200) {
      router.push("/newsletter-received")
    }
  }
  return (
    <><title>La Dionisia - Newsletter</title>
      <NavBar></NavBar>
      <div id="passion-for-wine" className="
  main-body
  home
  mb-8
  m-auto
  max-w-screen-xl
  pb-24
  sm:rounded-2xl	
">
        <div className="h-100">
          <div className="relative max-w-screen-xl h-full opacity-90">
            <Image className="object-cover mainimage sm:rounded-t-2xl" layout="fill" loading="lazy" src="/assets/newsletter.jpg" />
          </div>
        </div>
        <h1>News<span className="divider"></span></h1>
        <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0
  -mt-24
  mb-16
  ">
          Every day we publish articles to pique your interest and awaken your thirst for wine knowledge. Too busy to visit? No problem – just sign up for our newsletter for weekly highlights from our articles, with links to the stories you may have missed.
        </p>
        <div id={style.newsletter} className="z-0">
          <form id="newsletterform" onSubmit={send}>
            <input type="newsletter" id="newsletter" name="newsletter"/>
            <img className="mt-4" src="assets/stamp.png" />
            <div className="title font-montserrat text-gray-600 text-xl pl-2 mt-4">
              Newsletter
            </div>
            <label htmlFor="email" className=" pl-10 font-montserrat text-gray-600 text-xl">
              Send us your email, we'll make sure you never miss a thing!
            </label>
            <input id="emailfield" name="email" className="font-montserrat text-xl" type="email" required placeholder="enter your email" value={email || userExistente?.email} onChange={(e) => setEmail(e.target.value)} />
            <input type="submit" value="subscribe now" />
          </form>
        </div>
      </div><Footer />
    </>
  )
}
export default Newsletter;

