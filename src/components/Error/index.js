import React from 'react';
import error from 'assets/img/error.png';

function Error({ message }) {
  return (
    <div className="d-flex flex-column align-items-center p-5 m-5">
      <div className="col mt-5">
        <img src={error} alt="error" />
      </div>
      <div className="col mt-5">
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Error;
