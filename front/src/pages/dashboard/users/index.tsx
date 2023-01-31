import { useSelector } from "react-redux"
import Sidebar from "../../../components/Dashboard/Sidebar"
import Footer from "../../../components/Footer/Footer"
import NavBar from "../../../components/Navbar/NavBar"
import { getAllUsersAuth0, selectAllUsersAuth0, AllUsersStatus } from "../../../features/comments/commentsSlice"
import { useAppDispatch } from "../../../app/store"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { EStateGeneric } from "../../../utils/general"
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Users = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const users = useSelector(selectAllUsersAuth0)
  useEffect(() => {
    const fetchData = async () => {
      if (router.isReady) {
        await dispatch(getAllUsersAuth0());
      }
    }
    fetchData()
  }, [])
  console.log(users)
  return (
    <><title>La Dionisia - Dashboard</title>
      <NavBar />
      <div className="
            main-body
            home
            mb-8
            m-auto
            max-w-screen-xl
            pb-24
            sm:rounded-2xl
    ">
        <div className="w-full flex ">
          <Sidebar />
          <div className="w-full flex flex-col ">
            <DataTable value={users} header="List of All Users:" showGridlines >
              <Column className="p-3" field="name" header="E-mail"></Column>
              <Column field="nickname" header="nickname"></Column>
              <Column field="logins_count" header="loggin count"></Column>
            </DataTable>
            <div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Users