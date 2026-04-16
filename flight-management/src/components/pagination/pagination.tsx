import { useState } from "react"

type PaginationProps = {
    itemsPerPage: number,
    totalItems: number,
    onChangePage: (start: number, end:number) => void
}


const Pagination = ({itemsPerPage, totalItems, onChangePage}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems/itemsPerPage);

    const handlePageChange = (page : number) => {
        setCurrentPage(page);
        onChangePage((page - 1) * itemsPerPage, page * itemsPerPage);
    }


    return (
        <div className="flex justify-end mx-2">
            {Array.from({length: totalPages}, (_,i) => i + 1).map((page) => (
                <button
                 key={page}
                 onClick={() => handlePageChange(page)}
                 className={`w-8 h-8 text-xs mx-0.5 text-center px-1 my-2 hover:bg-gray-500 hover:text-white hover:outline-none focus:outline-none ${page === currentPage ? "bg-black" : "bg-white text-black border-gray-300 "}`}
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination