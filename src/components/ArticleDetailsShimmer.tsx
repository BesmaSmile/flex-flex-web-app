import React from 'react';
import RatingStars from './RatingStars';
function ArticleDetailsShimmer() {
  return (
    <div className="p-5 d-flex flex-row">
      <div className="me-4">
        <div className="w-[270px] h-[405px] rounded-[10px] bg-gradient-to-r from-[#828181] via-[#999898] to-[#828181] bg-[length:200%] animate-shimmer" />
      </div>
      <div className="col">
        <div className="d-flex flex-row justify-content-between">

          <div className="w-[400px] h-[30px] rounded-[10px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
          <i className="text-[25px] text-[#999898] bi bi-heart" />

        </div>
        <div className="w-[80px] h-[7px] rounded-[3px] my-[10px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
        <RatingStars value={0} />
        {[0, 1, 2].map((e) => (
          <div key={e} className="mt-5">
            <div className="w-[100px] h-[15px] rounded-[5px] mb-[10px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
            <div className="w-[70%]">
              <p className="w-[80%] h-[7px] rounded-[3px] my-[4px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
              <p className="h-[7px] rounded-[3px] my-[4px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
              <p className="h-[7px] rounded-[3px] my-[4px] bg-gradient-to-r from-[#afaaaa] via-[#dddddd] to-[#afaaaa] bg-[length:200%] animate-shimmer" />
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ArticleDetailsShimmer;
