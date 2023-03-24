import React from 'react';
import RatingStars from 'components/RatingStars';
import './style.scss';

function ArticleDetailsShimmer() {
  return (
    <div className="article-details-shimmer p-5 d-flex flex-row">
      <div className="me-4">
        <div className="img-shimmer animated light" />
      </div>
      <div className="col">
        <div className="d-flex flex-row justify-content-between">

          <div className="title-shimmer animated dark" />
          <i className="favorite-icon-shimmer bi bi-heart" />

        </div>
        <div className="date-shimmer animated light" />
        <RatingStars value={0} />
        {[0, 1, 2].map((e) => (
          <div key={e} className="mt-5">
            <div className="subtitle-shimmer animated dark" />
            <div className="paragraph-shimmer">
              <p className="animated light" />
              <p className="animated light" />
              <p className="animated light" />
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default ArticleDetailsShimmer;
