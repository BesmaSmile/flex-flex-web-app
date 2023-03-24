import React from 'react';
import box from 'assets/img/box.png';

function NoResult({ message }) {
  return (
    <div className="d-flex flex-column align-items-center p-5 m-5">
      <div className="col mt-5">
        <img src={box} alt="No result" />
      </div>
      <div className="col mt-5">
        <div>{message}</div>
      </div>
    </div>
  );
}

export default NoResult;
