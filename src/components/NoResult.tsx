import React from 'react';
import box from '@/assets/img/box.png';
import Image from 'next/image';

function NoResult({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center p-5 m-5">
      <div className="col mt-5">
        <Image src={box} alt="No result" />
      </div>
      <div className="col mt-5">
        <div>{message}</div>
      </div>
    </div>
  );
}

export default NoResult;