import { useEffect, useState } from "react";
import Card from "../Card";
import UpdateProduct from "../UpdateProduct";
import Pagination from "../../Pagination";
export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
};
export default function WinesDisabled({ winesDisabled }) {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(21);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = winesDisabled.slice(indexOfFirstItem, indexOfLastItem);
    useEffect(() => {
        setIsLoading(false);
    }, []);
    if (isLoading) {
        return null;
    }
    function handleEditProduct(product) {
        setSelectedProduct(product);
        document.body.classList.add('modal-open');
    }

    const onPageChange = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    function handleCloseModal() {
        setSelectedProduct(null);
        document.body.classList.remove('modalU-open');
    }

    return (
        <>
            <div className="w-full h-full flex flex-wrap self-center justify-center divide-x-2 gap-y-8">
                {
                    currentItems.map((wine) => (
                        <Card key={wine.id} wine={wine} handleEditProduct={handleEditProduct}></Card>
                    ))
                }
                {selectedProduct && (
                    <div className="modalU">
                        <UpdateProduct handleCloseModal={handleCloseModal} selectedProduct={selectedProduct}></UpdateProduct>
                    </div>

                )}

            </div>
            <Pagination
                onPageChange={onPageChange}
                wines={winesDisabled}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}
