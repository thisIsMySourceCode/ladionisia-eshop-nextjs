import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/NavBar"
import Sidebar from "../../components/Dashboard/Sidebar";
import { Chart } from "primereact/chart"


const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales($USD)',
            data: [15000, 59000, 8000, 81000, 56000, 55000, 40000],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        }
    ]
};

const lineData2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Stock (2899)',
            data: [4000, 5300, 8900, 810, 5600, 5500, 2889],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
};

export default function Dashboard() {
    const [hasMounted, setHasMounted] = useState(false);
    //   useEffect(() => {
    //     setHasMounted(true);
    //   }, []);
    //   if (!hasMounted) {
    //     return null;
    //   }
    return (
        <><title>La Dionisia - Dashboard</title>
            <NavBar></NavBar>
            <div className="
            main-body
            home
            mb-8
            m-auto
            max-w-screen-xl
            pb-24
            sm:rounded-2xl
            ">

                <div className="w-full flex">
                    <Sidebar />
                    <div className="w-full flex flex-col">
                        <div className="scale-95">
                            <Chart type="line" data={lineData2} />
                        </div>
                        <div className="scale-95">
                            <Chart type="line" data={lineData} />
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}
