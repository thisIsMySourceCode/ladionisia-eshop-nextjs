import { useEffect, useState } from "react";
import DashboardLogoBlack from "../../assets/img/DashboardBlack.svg"
import DashboardLogoWhite from "../../assets/img/DashboardWhite.svg"
import WinesLogoBlack from "../../assets/img/WinesBlack.svg"
import WinesLogoWhite from "../../assets/img/WinesWhites.svg"
import UsersLogoBlack from "../../assets/img/UsersBlack.svg"
import UsersLogoWhite from "../../assets/img/UsersWhite.svg"
import FAIcon from "../FAIcon";
const Sidebar = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) {
        return null;
    }
    return (
        <>
            <div className="h-full flex self-start p-2">
                <div className="w-full 0rounded-lg">
                    <div className="w-ful px-1 p-1">
                        <ul className="space-y-6">
                            <li className="flex hover:bg-gray-300 hover:bg-opacity-50 rounded-lg py-2 px-1">
                              <span>
                                <FAIcon
                                  size="lg"
                                  type="light"
                                  name="chart-line"
                                />
                              </span>
                              <a className="ml-4 my-auto text-lg font-medium" href="/dashboard" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Dashboard
                              </a>
                            </li>
                            <li className="flex hover:bg-gray-300 hover:bg-opacity-50 rounded-lg py-2 px-1">
                              <span>
                                <FAIcon
                                  size="lg"
                                  name="jug"
                                />
                              </span>
                              <a className="ml-4 my-auto text-lg font-medium" href="/dashboard/products" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Products
                              </a>
                            </li>
                            <li className="flex hover:bg-gray-300 hover:bg-opacity-50 rounded-lg py-2 px-1">
                              <span>
                                <FAIcon
                                  type="light"
                                  size="lg"
                                  name="users"
                                />
                              </span>
                              <a className="ml-4 my-auto text-lg font-medium" href="/dashboard/users" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Users
                              </a>
                            </li>
                            <li className="flex hover:bg-gray-300 hover:bg-opacity-50 rounded-lg py-2 px-1">
                              <span>
                                <FAIcon
                                  type="light"
                                  size="lg"
                                  name="comments"
                                />
                              </span>
                              <a className="ml-4 my-auto text-lg font-medium" href="/dashboard/comments" data-mdb-ripple="true" data-mdb-ripple-color="dark">
                                Comments
                              </a>
                            </li>
                        </ul>
                    </div>
                    {/* <h2 className="text-xl text-center">other</h2>
                    <div className="w-ful px-1 p-1">
                        <ul className="relative">
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 1</a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
                            </li>
                            <li className="relative">
                                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav link 2</a>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </>
    )
}
export default Sidebar