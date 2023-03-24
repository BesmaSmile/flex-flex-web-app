import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginatedList, ArticleCardShimmers, ArticleCard } from 'components';

import './style.scss';

function TvShows() {
  const { tvShowsPage } = useSelector((state) => state.tvShows);
  const dispatch = useDispatch();
  const loadTvShowsPage = (page) => {
    dispatch({
      type: 'tvShows/GET_POPULAR_TV_SHOWS_PAGE',
      payload: {
        page,
      },
    });
  };

  const getFavorite = () => {
    dispatch({
      type: 'favorite/GET_FAVORITE',
    });
  };

  useEffect(() => {
    loadTvShowsPage(1);
    getFavorite();
  }, []);

  return (
    <div className="tv-shows mt-5">
      <PaginatedList title="TV Shows" state={tvShowsPage} loadData={loadTvShowsPage} Shimmer={ArticleCardShimmers}>
        {tvShowsPage.data.map((tvShow) => (
          <ArticleCard
            key={tvShow.id}
            article={{ ...tvShow, category: 'tv-show' }}
          />
        ))}
      </PaginatedList>
    </div>

  );
}

export default TvShows;
