import React from 'react';
import Spinner from 'react-bootstrap/Spinner';


export const Spiner = () => {
  return (
    <>
    <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "50vh" }}>
        <Spinner animation="border" variant="danger" />&nbsp; Loading...
      </div>
    </>
  )
}
