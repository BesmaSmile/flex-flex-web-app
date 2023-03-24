import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PaginatedList, ArticleCardShimmers, ArticleCard, Tabs,
} from 'components';

import './style.scss';

function Favorite() {
  const favorite = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  const getFavorite = () => {
    dispatch({
      type: 'favorite/GET_FAVORITE',
    });
  };

  useEffect(() => {
    getFavorite();
  }, []);

  const [selectedMoviesPage, setSelectedMoviesPage] = useState(1);
  const [selectedTvShowsPage, setSelectedTvShowsPage] = useState(1);

  const pageSize = 20;
  const favoriteMovies = favorite.data.filter((article) => article.category === 'movie');
  const favoriteTvShows = favorite.data.filter((article) => article.category === 'tv-show');

  const favoriteMoviesState = {
    page: selectedMoviesPage,
    totalPages: Math.ceil(favoriteMovies.length / pageSize),
    loading: favorite.loading,
    error: favorite.error,
    data: favoriteMovies.slice((selectedMoviesPage - 1) * pageSize, selectedMoviesPage * pageSize),
  };

  const favoriteTvShowsState = {
    page: selectedTvShowsPage,
    totalPages: Math.ceil(favoriteTvShows.length / pageSize),
    loading: favorite.loading,
    error: favorite.error,
    data: favoriteTvShows.slice(
      (selectedTvShowsPage - 1) * pageSize,
      selectedTvShowsPage * pageSize,
    ),
  };

  const loadFavoriteMoviesPage = (page) => {
    setSelectedMoviesPage(page);
  };

  const loadFavoriteTvShowsPage = (page) => {
    setSelectedTvShowsPage(page);
  };
  return (
    <div className="favorite d-flex flex-column align-items-center m-5">
      <div className="col-11 title"> My Favorite</div>
      <div className="col-11 mt-4">
        <Tabs>
          <div id="movies" label="Movies">
            <PaginatedList title="" state={favoriteMoviesState} loadData={loadFavoriteMoviesPage} Shimmer={ArticleCardShimmers}>
              {favoriteMoviesState.data.map((movie) => (
                <ArticleCard
                  key={movie.id}
                  article={{ ...movie, category: 'movie' }}
                />
              ))}
            </PaginatedList>
          </div>
          <div id="tv-shows" label="Tv Shows">
            <PaginatedList title="" state={favoriteTvShowsState} loadData={loadFavoriteTvShowsPage} Shimmer={ArticleCardShimmers}>
              {favoriteTvShowsState.data.map((movie) => (
                <ArticleCard
                  key={movie.id}
                  article={{ ...movie, category: 'tv-show' }}
                />
              ))}
            </PaginatedList>
          </div>
        </Tabs>
      </div>
    </div>

  );
}

export default Favorite;
