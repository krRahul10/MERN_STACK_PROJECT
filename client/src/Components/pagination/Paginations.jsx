import React from "react";
import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ handleNext, handlePrev, page, pageCount, setPage }) => {
  return (
    <>
      {pageCount > 0 ? (
        <div className="pagination_div d-flex justify-content-center mx-5">
          <Pagination>
            <Pagination.Prev onClick={() => handlePrev()} />
            {Array(pageCount)
              .fill(null)
              .map((el, index) => {
                return (
                  <>
                    <Pagination.Item active={page===index+1 ? true:false} onClick={()=> setPage(index+1)}>{index+1}</Pagination.Item>
                  </>
                );
              })}

            <Pagination.Next onClick={() => handleNext()} />
          </Pagination>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Paginations;
