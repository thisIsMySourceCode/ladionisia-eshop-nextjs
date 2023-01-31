import Router from "next/router";
import NavBar  from '../../components/Navbar/NavBar'
import Footer  from '../../components/Footer/Footer'

const Success = () => {
  return (
    <>
    <NavBar/>
    <div className="
    main-body
    home
    mb-8
    m-auto
    max-w-screen-xl
    pb-24
    sm:rounded-2xl
    ">
        
          <div className="bg-white rounded-lg shadow relative">
            <span className="w-full h-20 bg-purple-600 flex rounded-t-lg"></span>
             <h1 className="font-bold text-3xl text-center my-auto pl-6 align-center">
              <span className="text-green-500 mr-8">            
              <i className="fa-solid fa-circle-check text-6xl fill-current "></i>
              </span>
                Payment successful!</h1>
            <div className="flex flex-col px-20 mb-6 w-full space-y-6 font-light text-xl">

              <button className="font-bold  font-poppins lucho block border border-black border-opacity-75 px-10 py-6 rounded-xl" onClick={() => Router.push('/home')}>
                Go back to Home
              </button>
            </div>
        
      </div>
    </div><Footer/>
    </>
  )
}

export default Success;