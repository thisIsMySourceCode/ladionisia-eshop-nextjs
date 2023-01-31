import React, { useState } from "react";
import Image   from 'next/image';
import { useSelector } from "react-redux";
import { selectMaxPageNumLim, selectMinPageNumLim, setMaxPageNumLim, setMinPageNumLim } from "../features/generalSlice";
import { useAppDispatch } from "../app/store";


function Pagination({ onPageChange, wines, itemsPerPage, currentPage, setCurrentPage }) {

  const dispatch = useAppDispatch()
    const pageNumberLimit = 10;
    // const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
    // const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const minPageNumLim = useSelector(selectMinPageNumLim)
    const maxPageNumLim = useSelector(selectMaxPageNumLim)
    const pages = [];

    for (let i = 1; i <= Math.ceil(wines.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const totales =  Math.ceil(wines.length / itemsPerPage);


    const renderPageNumbers = pages.map((number) => {
            return null;
    })


const goPage = (e)  => {

    let quepage = Number(prompt("What page?"));
    if (!Number.isNaN(quepage) && quepage>0 && quepage <= totales)
    {
        setCurrentPage(quepage);
    }
else {
   setCurrentPage(1);
    
}    


}


    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumLim) {
          dispatch(setMaxPageNumLim(maxPageNumLim + pageNumberLimit));
          dispatch(setMinPageNumLim(minPageNumLim + pageNumberLimit));
        }
    };
    const handlePrevbtn = () => {
      setCurrentPage(currentPage - 1);
      if ((currentPage - 1) % pageNumberLimit == 0) {
        dispatch(setMaxPageNumLim(maxPageNumLim - pageNumberLimit));
        dispatch(setMinPageNumLim(minPageNumLim - pageNumberLimit));
      }
    };
    const handleLastPage = () => {
      setCurrentPage(pages[pages.length - 1]);
      let newMaxPageNumberLimit = Math.ceil(pages[pages.length - 1] / pageNumberLimit) * pageNumberLimit;
      dispatch(setMaxPageNumLim(newMaxPageNumberLimit));
      dispatch(setMinPageNumLim(newMaxPageNumberLimit - pageNumberLimit));
    }
    const handleFirstPage = () => {
      setCurrentPage(1);
      dispatch(setMaxPageNumLim(10))
      dispatch(setMinPageNumLim(0));
    }

    let pageIncrementBtn = null;
    return (
        <>


<div className="fixme font-poppins font-xl">
    
<button
                className="pager-left"
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
            ><Image width={58} height={58}  src="/assets/left.svg"/>
            </button>

    <div onClick={goPage}>

{currentPage}/{totales}

    </div>


    <button
                className="pager-right"
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
            ><Image width={58} height={58}  src="/assets/right.svg"/>
    </button>
 </div>


    


        </>
    );
}

export default Pagination;