import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PaginatedList, ArticleCardShimmers, ArticleCard } from 'components';

import './style.scss';

function Movies() {
  const { moviesPage } = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const loadMoviesPage = (page) => {
    dispatch({
      type: 'movies/GET_POPULAR_MOVIES_PAGE',
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
    loadMoviesPage(1);
    getFavorite();
  }, []);

  return (
    <div className="movies mt-5">
      <PaginatedList title="Movies" state={moviesPage} loadData={loadMoviesPage} Shimmer={ArticleCardShimmers}>
        {moviesPage.data.map((movie) => (
          <ArticleCard
            key={movie.id}
            article={{ ...movie, category: 'movie' }}
          />
        ))}
      </PaginatedList>
    </div>

  );
}

export default Movies;
