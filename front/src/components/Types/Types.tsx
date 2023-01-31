import React from 'react'
import Image from "next/image";


const Types = () => {
  return (
    <div className="
    w-full 
    flex 
    justify-around 
    items-center 
    mt-8
    wine-types
    mb-8
  ">
    <a href='/products/type/rose'>
      <div  className="rose text-center font-poppins text-gray-600">
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/rose.png" layout='fill' />
        </div>
        Rose
      </div>
    </a>
    <a href='/products/type/whites'>
      <div className="white text-center font-poppins text-gray-600">
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/white.png" layout='fill' />
        </div>
        White
      </div>
    </a>
    <a href='/products/type/reds'>
      <div className="red text-center font-poppins text-gray-600">
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/red.png" layout='fill'/>
        </div>
        Red
      </div>
    </a>
    <a href='/products/type/sparkling'>
      <div className="sparkling text-center font-poppins text-gray-600">
        <div className='w-32 h-32 relative mb-2'>
            <Image src="/assets/sparkling.png" layout='fill' />
        </div>
        Sparkling
      </div>
    </a>
    <a href='/products/type/dessert'>
      <div className="dessert text-center font-poppins text-gray-600">
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/dessert.png" layout='fill' />
        </div>
        Dessert
      </div>
    </a>
  </div>
  )
}

export default Types