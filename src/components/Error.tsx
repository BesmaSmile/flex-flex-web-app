import React from 'react';
import Image from 'next/image';
import error from '@/assets/img/error.png';


function Error({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center p-5 m-5">
      <div className="flex flex-col mt-5">
        <Image src={error} alt="error" />
      </div>
      <div className="flex flex-col mt-5">
        <div>{message}</div>
      </div>
    </div>
  );
}

export default Error;
