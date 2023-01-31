import Image   from 'next/image'
import Link    from 'next/link'
import NavBar  from '../../components/Navbar/NavBar'
import Circles from '../../components/Circles/Circles'
import Footer  from '../../components/Footer/Footer'

const HomePage = () => {
return (
<>

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
            <Image className="object-cover mainimage sm:rounded-t-2xl 	" layout="fill" loading="lazy" src="/assets/homeprov.webp" />
          </div>
        </div>
        <h1>Welcome<span className="divider"></span></h1>
        <Circles/>
        <div className="flex flex-row justify-center mt-14 sm:mt-24 sm:ml-0">
          <div className="grow w-2/3 max-w-xl	 self-center">
            <h3 className="font-poppins poppy uppercase text-sm sm:text-base sm:tracking-widest">Château-l'Hermitage</h3>
            <h2 className="font-playfair font-bold choco text-4xl sm:text-7xl leading-10 mt-2 sm:mt-8 tracking-wide">
              The wine
              <br /><span className="text-4xl sm:text-5xl tracking-wide">
                among wines
              </span></h2>
            <p className="font-poppins bore font-extralight	text-sm sm:text-xl mt-4 mb-2 max-w-prose	sm:pl-20 sm:pr-20">
              The most luxurious vineyard to taste the best French wines
            </p>
            <Link href="/products/2889">
              <button className="rounded boton">TASTE IT</button>
            </Link>
          </div>
          <div className="flex-none w-1/3 flowers">
            <Image src="/assets/bordeaux.png" width="105px" height="350px" />
          </div>
        </div>
      </div>
      <Footer />


    </>
  )};export default HomePage;

