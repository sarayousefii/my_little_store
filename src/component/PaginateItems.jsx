import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ProductsList from "./ProductsList";

const PaginateItems = ({ itemsPerPage, items, isSuccess, isLoading, isError }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;

  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    document.documentElement.scrollTop = 0;
    setItemOffset(newOffset);
  };

  const handleFirstPage = () => setItemOffset(0);
  const handleLastPage = () => setItemOffset((pageCount - 1) * itemsPerPage);

  const toPersianNumber = (num) => num.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

  return (
    <>
      <ProductsList
        products={currentItems}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
      />

      {pageCount > 1 && (
        <div className="flex justify-center mt-4 mb-8 items-center gap-1 flex-wrap">

          <button
            onClick={handleFirstPage}
            className={`px-3 py-1 border border-orange-500 rounded-full text-sm md:text-base transition-colors duration-200
              ${itemOffset === 0 ? "text-orange-700 font-bold cursor-not-allowed" : "text-orange-400 hover:bg-orange-500 hover:text-white"}`}
          >
            ⏭
          </button>

          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName="flex items-center gap-1 md:gap-2 flex-wrap"
            pageClassName=""
            pageLinkClassName="px-3 py-2 md:px-4 md:py-2 border border-orange-500 rounded-full text-orange-400 hover:bg-orange-500 hover:text-white text-sm md:text-base transition-colors duration-200"
            previousLinkClassName="px-3 py-2 md:px-4 md:py-2 border border-orange-500 rounded-full text-orange-400 hover:bg-orange-500 hover:text-white text-sm md:text-base transition-colors duration-200"
            nextLinkClassName="px-3 py-2 md:px-4 md:py-2 border border-orange-500 rounded-full text-orange-400 hover:bg-orange-500 hover:text-white text-sm md:text-base transition-colors duration-200"
            forcePage={Math.floor(itemOffset / itemsPerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageLabelBuilder={(page) => toPersianNumber(page)}
            activeLinkClassName="bg-orange-500 text-white border-orange-500 font-bold"
          />

          <button
            onClick={handleLastPage}
            className={`px-3 py-1 border border-orange-500 rounded-full text-sm md:text-base transition-colors duration-200
              ${itemOffset + itemsPerPage >= items.length ? "text-orange-700 font-bold cursor-not-allowed" : "text-orange-400 hover:bg-orange-500 hover:text-white"}`}
          >
           ⏮ 
          </button>
        </div>
      )}
    </>
  );
};

export default PaginateItems;
