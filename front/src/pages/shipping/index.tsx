import Image from 'next/image'
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";


const Shipping = () => {
  return (
<><title>La Dionisia - Shipping</title>
<NavBar></NavBar>
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
      <Image className="object-cover mainimage sm:rounded-t-2xl" layout="fill" loading="lazy" src="/assets/copaa.webp"/>
    </div>
  </div>
  <h1>Shipping & Returns<span className="divider"></span></h1>
  <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0
  -mt-16 
  ">
  All purchases through our site or other transactions for the sale of goods, or services formed through the Website, by phone, or resulting from visits made by you, are governed by this Shipping & Returns section and our Terms and Conditions of Sale, which are hereby incorporated into these Terms of Use.
  Additional terms and conditions may also apply to specific portions, services, or features of the Website.          
  </p>
  <h2 className="font-playfair lucho text-4xl sm:text-5xl	mb-10 mt-20">Return Policy</h2>
  <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
  ">
  La Dionisia fully guarantees any wine purchased directly from our winery or ladionisia.com. If you feel you have opened an unsatisfactory bottle, please save the contents, and contact us. We will be happy to replace or exchange it at no additional cost to you.
  Any orders that you wish to cancel must be canceled before the shipment leaves our facility.
  </p>
  <h2 className="font-playfair lucho text-4xl sm:text-5xl	mb-10 mt-20 ">Cancelled Orders</h2>

  <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
      pb-12
">
  Any orders that you wish to cancel must be canceled before the shipment leaves our facility.
  Shipping and handling charges are non-refundable.
  For items such as event tickets where there are no shipments, please see our Event Ticket section below.
  By placing your order, you agree to the best of your knowledge that you are aware of the product and/or service you are purchasing, and that it is not being done in/with error, or without your consent.
  </p>

</div><Footer/>

</>
)};export default Shipping;
