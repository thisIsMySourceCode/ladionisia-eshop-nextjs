import React from 'react'
import Image from 'next/image'
export default function MembersCard({name, image, github,linkedin }){
return(
<>
<div className="w-full max-w-screen-xl sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-12">
  <div className="text-center font-poppins font-normal text-gray-600 flex flex-col items-center">
    <div className='w-24 h-24 relative mb-2'>
      <img className="rounded-full" src={image} />
    </div>
    <p>{name}</p>
    <p>
      <a href={github} target="_blank"> <Image src="/assets/github.svg" width={17} height={17}/> </a>
      <a className="ml-2" href={linkedin} target="_blank"> <Image src="/assets/linkedin.svg" width={17} height={17}/> </a>  
    </p>
  </div>
</div>
</>
)}
