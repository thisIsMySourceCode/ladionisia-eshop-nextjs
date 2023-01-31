import Link from "next/link";
import Image from "next/image";
const Circles = () => { return (
<>
<div className="flex flex-wrap justify-center items-center">
  <div className="w-full max-w-screen-xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 mb-4">
    <div className="rose text-center font-poppins font-normal	text-gray-600 flex flex-col items-center">
      <a href='/products/type/rose'>
        <div className='w-32 h-32 relative mb-2'>
            <Image src="/assets/rose.png" layout='fill' />
        </div>
        Rose
      </a>
    </div>
  </div>
  <div className="w-full max-w-screen-xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 mb-4">
    <div className="white text-center font-poppins font-normal	text-gray-600 flex flex-col items-center">
      <a href='/products/type/whites'>
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/white.png" layout='fill' />
        </div>
        White
      </a>
    </div>
  </div>
  <div className="w-full max-w-screen-xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 mb-4">
    <div className="red text-center font-poppins font-normaltext-gray-600 flex flex-col items-center">
      <a href='/products/type/reds'>
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/red.png" layout='fill' />
        </div>
        Reds
      </a>
    </div>
  </div>
  <div className="w-full max-w-screen-xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 mb-4">
    <div className="sparkling text-center font-poppins font-normal	text-gray-600 flex flex-col items-center">
      <a href='/products/type/sparkling'>
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/sparkling.png" layout='fill' />
        </div>
        Sparkling
      </a>
    </div>
  </div>
  <div className="w-full max-w-screen-xl sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/5 mb-4">
    <div className="dessert text-center font-poppins font-normal	text-gray-600 flex flex-col items-center">
      <a href='/products/type/dessert'>
        <div className='w-32 h-32 relative mb-2'>
          <Image src="/assets/dessert.png" layout='fill' />
        </div>
        Dessert
      </a>
    </div>
  </div>
</div>
</>)};export default Circles;
