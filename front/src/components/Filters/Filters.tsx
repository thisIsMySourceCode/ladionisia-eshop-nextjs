/* eslint-disable react/no-direct-mutation-state */

import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { setFilters, setMaxPageNumLim, setMinPageNumLim } from "../../features/generalSlice";
import { getAllWines, getWinerys, orderByName, selectAllRegions, selectAllWinerys } from "../../features/products/productsSlice";
import { useEffect } from "react";
const Filters = ({ setCurrentPage }) => {
    const winerys = useSelector(selectAllWinerys)
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllWines());
            await dispatch(getWinerys());
        }
        fetchData()
    }, [])
    const dispatch = useAppDispatch()
    const regions = useSelector(selectAllRegions)
    function handleFilters(e) {
        const { value, name } = e.target;
        dispatch(setFilters({ [name]: value }));

        setCurrentPage(1)
        dispatch(setMaxPageNumLim(10))
        dispatch(setMinPageNumLim(0));
    }
    function handleSort(e) {
        dispatch(orderByName(e.target.value)),
            setCurrentPage(1),
            dispatch(setMaxPageNumLim(10))
        dispatch(setMinPageNumLim(0));
    }
    const vintage = [
        "2010-Present",
        "2000-2009",
        "1990-1999",
        "1980-1989",
        "1970-1979",
        "1960-1969",
        "1959-Older",
    ]
    const scores = [
        "100",
        "99-97",
        "96-94",
        "93-91"
    ]

    return (
        <div className="w-full inline-flex text-center font-poppins justify-around text-gray-600 mb-8 mt-8 flex-wrap gap-5 ml-2 pr-4">
            <select id="filter-az" onChange={e => handleSort(e)} className="bg-[#F2F9F4] text-center box-content rounded shadow-lg  
            self-center pt-2  pr-2 pl-3 pb-2 pb-2">
                <option disabled selected >SORT</option>
                <option className="" value="atoz">A - Z</option>
                <option className="" value="ztoa">Z - A</option>
            </select>
            <select id="filter-price" name="price" className="bg-[#F2F9F4] text-center box-content rounded shadow-lg  self-center 
            pt-2  pr-2 pl-3 pb-2 pb-2" onChange={handleFilters}>
                <option disabled selected>PRICE</option>
                <option value="all-price">ALL</option>
                <option value="100-200">$100 - $200</option>
                <option value="50-99">$50 - $99</option>
                <option value="30-49">$30 - $49</option>
                <option value="20-29">$20 - $29</option>
                <option value="16-19">$16 - $19</option>
                <option value="10-15">$10 - $15</option>
                <option value="6-9">$6 - $9</option>
            </select>
            {regions.length > 0 &&
                <select id="region" className="bg-[#F2F9F4] font-poppins text-center box-content rounded shadow-lg  self-center pt-2  pr-2 pl-3 pb-2 pb-2" name="region" onChange={handleFilters}>
                    <option disabled selected>REGIONS</option>
                    <option value="all-region">ALL</option>
                    {regions.map((region, index) => (
                        <option key={index} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            }
            <select id="filter-winery" className="bg-[#F2F9F4] text-center box-content rounded shadow-lg  self-center pt-2  pr-2 pl-3 pb-2 pb-2" name="winery" onChange={handleFilters}>
                <option disabled selected>WINERY</option>
                <option value="all-winery">ALL</option>
                {winerys.map((winery, index) => (
                    <option key={index} value={winery}>
                        {winery}
                    </option>
                ))}
            </select>
             <select id="filter-vintage" name="vintage" className="bg-[#F2F9F4] text-center box-content rounded shadow-lg  self-center pt-2  pr-2 pl-3 pb-2 pb-2" onChange={handleFilters} >
                <option disabled selected>VINTAGE</option>
                <option value="all-vintage">ALL</option>
                {vintage.map((v, index) => (
                    <option value={v} key={index}>
                        {v}
                    </option>
                ))}
            </select>
            <select id="filter-score" name="score" className="bg-[#F2F9F4] box-content text-center rounded shadow-lg  self-center pt-2  pr-2 pl-3 pb-2 pb-2" onChange={handleFilters}>
                <option disabled selected>SCORE</option>
                <option value="all-score">ALL</option>
                {scores.map((score, index) => (
                    <option value={score} key={index} >
                        {score}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Filters