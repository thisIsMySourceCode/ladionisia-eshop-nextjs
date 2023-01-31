import Image from 'next/image'
import NavBar from "../../components/Navbar/NavBar";

import members from '../../components/componentsAbout/membersInfo'
import MembersCard from '../../components/componentsAbout/membersCards'
import Footer from "../../components/Footer/Footer";
import { useState } from 'react';

const About = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
<><title>La Dionisia - About</title>
<NavBar setCurrentPage={setCurrentPage}></NavBar>
<div id="passion-for-wine" className="
  main-body
  home
  mb-8
  m-auto
  max-w-screen-xl
  pb-24
  sm:rounded-2xl	
"><div className="h-100">
    <div className="relative max-w-screen-xl h-full opacity-90">
      <Image className="object-cover mainimage sm:rounded-t-2xl 	" layout="fill" loading="lazy" src="/assets/about.jpg" />
    </div>
  </div>
  <h1>About Us<span className="divider"></span></h1>
  <p className="mt-12 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
  ">
     What do we believe? The wine is for all. You don't have to be a connoisseur to be able to enjoy it. We want everyone to approach this great drink without fear, without prejudice.  
     There are no rules for enjoying wine. Everything changed. How to enjoy wine, too. Each bottle accompanies an experience, a unique pairing. Watching a movie in bed or hanging out on the terrace with friends. The possibilities are endless, it's just a matter of trying. There are no rules or formulas, just a desire to enjoy and share. We are, after all, accomplices of your moments lived.
  </p>
  <p className="mt-12 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
  ">
     Dionisia is a young company, with a different and innovative concept in the wine market. We are versatile independent professionals, lovers of wine and our own, who work to make the best of the products of our land known. Our company is from Argentina, it has a wide spectrum of associated wineries and of course its best wine production available to our customers.
     Our company's mission is to generate a commercialization that meets what our clients are looking for at this time in the field of wine and related products in Argentina. We are certain that our work team is highly trained, proactive, and capable of guiding our clients to meet our products. We aim to be the best option for the sale of wines and the like; demonstrate that our service is exceptional, personalized and of the highest level; stand out as a modern alternative that does not lose elegance or quality. We propose to innovate in the area that we appreciate so much; be versatile and adapt to the demands of our customers; as well as being dynamic and original when we present our products.
  </p>
  <h2 className="font-playfair text-gray-600 text-3xl sm:text-4xl lucho mt-8" >OUR TEAM</h2>


<div className="flex flex-wrap justify-center items-center mt-12">
{members?.map((e,index)=>{
     return(
      <MembersCard key={index}
        name={e.name}
        image={e.image}
        github={e.github}
        linkedin={e.linkedin}
      />
     )
    })}
</div>


{/* 
  <div className="w-full max-w-screen-xl sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4">
    <div className="white text-center font-poppins font-normal text-gray-600 flex flex-col items-center">
        <div className='w-24 h-24 relative mb-2'>
          <Image src="/assets/white.png" layout='fill' />
        </div>
        <p>White</p>
        <p>White</p>
    </div>
  </div>
*/}






{/*
  <div className="flex flex-wrap justify-center items-center">
  </div>
  */}

{/* 

*/}


</div><Footer/>

{/*

  <div className=" 
    div-members
    mt-8
    pb-16
    grid 
  ">
   {members?.map((e,index)=>{
     return(
      <MembersCard key={index}
        name={e.name}
        image={e.image}
        github={e.github}
        linkedin={e.linkedin}
      />
     )
    })}
  </div>
  <Footer/>
</div>
*/}
</>
)}
export default About;

