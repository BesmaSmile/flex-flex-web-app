import React from 'react';
import RatingStars from './RatingStars';
function ArticleDetailsShimmer() {
  return (
    <div className="mt-5">
      <div className="m-[40px] flex flex-row">
        {/* Image shimmer */}
        <div className="mr-3 w-[270px] h-[405px] rounded-md animated light" />

        <div className="flex-1 space-y-4">
          {/* Title + Heart icon */}
          <div className="flex justify-between items-center">
            <div className="w-1/2 h-6 rounded-md animated dark" />
            <i className="bi bi-heart text-gray-400 text-xl" />
          </div>

          {/* Date */}
          <div className="w-32 h-4 rounded-md animated light" />

          <RatingStars value={0} />

          {/* Subtitles + Paragraphs */}
          {[0, 1, 2].map((e) => (
            <div key={e} className="mt-5 space-y-2">
              <div className="w-1/3 h-5 rounded-md animated dark" />
              <div className="space-y-1">
                <p className="h-3 w-full rounded-md animated light" />
                <p className="h-3 w-5/6 rounded-md animated light" />
                <p className="h-3 w-2/3 rounded-md animated light" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default ArticleDetailsShimmer;
