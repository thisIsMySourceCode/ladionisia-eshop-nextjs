import Image from 'next/image'
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

const Privacy = () => {
  return (
<><title>La Dionisia - Privacy Policy</title>
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
      <Image className="object-cover mainimage sm:rounded-t-2xl" layout="fill" loading="lazy" src="/assets/copas.jpg" />
    </div>
  </div>
  <h1>Privacy<span className="divider"></span></h1>
  <h2 className="font-playfair lucho text-4xl sm:text-5xl	mb-10">Statement</h2>
  <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
  ">
  Protecting your privacy is fundamental to the way La Dionisia and its partners and subsidiaries (collectively, “Company,” “we,” “us,” or “our”) conduct business. Although privacy regulations require companies to inform you of their practices regarding the collection and use of your personal information, keeping client information confidential has always been our policy. We have always known that privacy is important to you, and we are committed to safeguarding your personal information. This Privacy Statement explains how we may collect, use and disclose your personal information.    
  </p>
  <h2 className="font-playfair lucho text-4xl sm:text-5xl	mt-10 mb-10">Personal Data</h2>
  <p className="mt-0 font-bodony text-gray-600 text-lg sm:text-xl text-justify m-auto max-w-prose hyphens
     pl-4 pr-4 
  sm:pl-8 sm:pr-8 
  md:pl-8 md:pr-8 
  lg:pl-1 lg:pr-1 
  xl:pl-0 xl:pr-0 
  ">
  In the course of offering and providing our products and services, it is common for us to receive sensitive information from and about our clients, including financial and business information, some of which constitutes personal information. Generally speaking, personal information is any information that can be used, directly or indirectly, to identify, locate or contact someone. Types of personal information include names, physical addresses, mailing addresses, social security numbers, email addresses, phone numbers, bank account numbers and driver’s license numbers. Under certain circumstances, personal information may also include other information that can reasonably link to a particular person, such as internet protocol (IP) addresses, unique device identification numbers, employment information, medical information and internet activity.   
  </p>
</div><Footer/>

{/* 
<a id="passion-for-wine"></a>
<div className="
  main-body
  main-about    
  pt-12 
  m-auto
  min-h-screen
  max-w-screen-xl
  bg-bg-body 
  ">
  <NavBar></NavBar>
  <img src="assets/copas.jpg"/>
  <h2 className="font-playfair text-gray-600 text-4xl mt-12" >PRIVACY STATEMENT</h2>
  <p className="font-bodony text-gray-600 text-xl text-justify mt-6">
  Protecting your privacy is fundamental to the way La Dionisia and its partners and subsidiaries (collectively, “Company,” “we,” “us,” or “our”) conduct business. Although privacy regulations require companies to inform you of their practices regarding the collection and use of your personal information, keeping client information confidential has always been our policy. We have always known that privacy is important to you, and we are committed to safeguarding your personal information. This Privacy Statement explains how we may collect, use and disclose your personal information.    
  </p>
  <h2 className="font-playfair text-gray-600 text-4xl mt-8" >PERSONAL INFORMATION</h2>
  <p  className="font-bodony text-gray-600 text-xl text-justify mt-6 pb-16">
  In the course of offering and providing our products and services, it is common for us to receive sensitive information from and about our clients, including financial and business information, some of which constitutes personal information. Generally speaking, personal information is any information that can be used, directly or indirectly, to identify, locate or contact someone. Types of personal information include names, physical addresses, mailing addresses, social security numbers, email addresses, phone numbers, bank account numbers and driver’s license numbers. Under certain circumstances, personal information may also include other information that can reasonably link to a particular person, such as internet protocol (IP) addresses, unique device identification numbers, employment information, medical information and internet activity.   
  </p><Footer/>
</div>
*/}
</>)};export default Privacy;

