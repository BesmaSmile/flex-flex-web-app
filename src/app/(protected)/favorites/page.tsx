"use client";
import React, { useEffect, useState } from 'react';
import {
  PaginatedList, ArticleCardShimmers, ArticleCard, Tabs,
  Tab,
} from '@/components';
import { useStore } from '@/store';


function Favorites() {
  const favorites = useStore((state) => state.favorites);
  const getFavorites = useStore((state) => state.getFavorites);

  useEffect(() => {
    getFavorites();
  }, []);

  const [selectedMoviesPage, setSelectedMoviesPage] = useState(1);
  const [selectedTvShowsPage, setSelectedTvShowsPage] = useState(1);

  const pageSize = 20;
  const favoriteMovies = favorites.data.filter((article) => article.category === 'movie');
  const favoriteTvShows = favorites.data.filter((article) => article.category === 'tv-show');

  const favoriteMoviesState = {
    page: selectedMoviesPage,
    totalPages: Math.ceil(favoriteMovies.length / pageSize),
    loading: favorites.loading,
    error: favorites.error,
    data: favoriteMovies.slice((selectedMoviesPage - 1) * pageSize, selectedMoviesPage * pageSize),
  };

  const favoriteTvShowsState = {
    page: selectedTvShowsPage,
    totalPages: Math.ceil(favoriteTvShows.length / pageSize),
    loading: favorites.loading,
    error: favorites.error,
    data: favoriteTvShows.slice(
      (selectedTvShowsPage - 1) * pageSize,
      selectedTvShowsPage * pageSize,
    ),
  };

  const loadFavoriteMoviesPage = (page: number) => {
    setSelectedMoviesPage(page);
  };

  const loadFavoriteTvShowsPage = (page: number) => {
    setSelectedTvShowsPage(page);
  };
  return (
    <div className="flex flex-col items-center my-10">
      <div className="w-10/12 font-light text-xl"> My Favorites</div>
      <div className="w-10/12 mt-4">
        <Tabs>
          <Tab id="movies" label="Movies">
            <PaginatedList title="" state={favoriteMoviesState} loadData={loadFavoriteMoviesPage} Shimmer={ArticleCardShimmers}>
              {favoriteMoviesState.data.map((movie) => (
                <ArticleCard
                  className="m-[5px]"
                  key={movie.id}
                  article={{ ...movie, category: 'movie' }}
                />
              ))}
            </PaginatedList>
          </Tab>
          <Tab id="tv-shows" label="Tv Shows">
            <PaginatedList title="" state={favoriteTvShowsState} loadData={loadFavoriteTvShowsPage} Shimmer={ArticleCardShimmers}>
              {favoriteTvShowsState.data.map((movie) => (
                <ArticleCard
                  className="m-[5px]"
                  key={movie.id}
                  article={{ ...movie, category: 'tv-show' }}
                />
              ))}
            </PaginatedList>
          </Tab>
        </Tabs>
      </div>
    </div>

  );
}

export default Favorites;
