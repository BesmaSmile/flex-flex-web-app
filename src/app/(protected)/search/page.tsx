"use client";
import React, { useState, useEffect, useCallback } from 'react';
import {
  Tabs, InfiniteScroll, ArticleCardShimmers, ArticleCard,
  Tab,
} from '@/components';
import { NoResult } from '@/components';
import { useStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useSearchNavigation } from '@/hooks';

function Search() {
  const moviesSearchResults = useStore((state) => state.moviesSearchResults);
  const searchMovies = useStore((state) => state.searchMovies);

  const tvShowsSearchResults = useStore((state) => state.tvShowsSearchResults);
  const searchTvShows = useStore((state) => state.searchTvShows);

  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [searchText, setSearchText] = useState(query ?? '');
  const searchNavigate = useSearchNavigation(true)

  const handleSeachTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    searchNavigate("/search", { query: searchText });
  };

  const search = useCallback((forceNewSearch: boolean = false) => {
    if (searchText.length > 0) {
      searchMovies(searchText ?? "", forceNewSearch);
      searchTvShows(searchText ?? "", forceNewSearch);
    }
  }, [searchText, searchMovies, searchTvShows]);

  useEffect(() => {
    if ((query?.length ?? 0) > 0) {
      search(true);
    }
  }, [query, search]);

  return (
    <div className="flex flex-col items-center my-10">

      <div className="w-10/12 flex justify-center">
        <div className="w-1/2">
          <div className="flex">

            <input type="text" value={searchText} onChange={handleSeachTextChange} className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/30 z-10" id="validationDefaultUsername" placeholder="Movies, TV Shows, and more..." />
            <div className="input-group-prepend">
              <button onClick={handleSearchClick} disabled={searchText.length === 0} type="button" className="h-full border border-l-0 border-gray-300 text-red-600 px-4 py-2 rounded-r-md hover:bg-gray-100 disabled:opacity-50">
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-10/12 mt-6">
        <Tabs>
          <Tab id="movies" label="Movies">
            <InfiniteScroll
              state={moviesSearchResults}
              pageSize={20}
              loadData={search}
              Shimmer={ArticleCardShimmers}
            >
              {moviesSearchResults.data.map((movie) => (
                <ArticleCard className="m-[5px]" key={movie.id} article={{ ...movie, category: 'movie' }} />
              ))}
            </InfiniteScroll>
            {(query?.length ?? 0) > 0 && moviesSearchResults.loading === false && !moviesSearchResults.error && moviesSearchResults.data.length === 0 && <NoResult message="No result" />}
            {!query?.length && <div className="mt-5">Start your search by typing the title of your favorite Movies or TV Shows...</div>}
          </Tab>
          <Tab id="tv-shows" label="Tv Shows">
            <InfiniteScroll
              state={tvShowsSearchResults}
              pageSize={20}
              loadData={search}
              Shimmer={ArticleCardShimmers}
            >
              {tvShowsSearchResults.data.map((movie) => (
                <ArticleCard className="m-[5px]" key={movie.id} article={{ ...movie, category: 'tv-show' }} />
              ))}
            </InfiniteScroll>
            {(query?.length ?? 0) > 0 && tvShowsSearchResults.loading === false && !tvShowsSearchResults.error && tvShowsSearchResults.data.length === 0 && <NoResult message="No result" />}
            {!query?.length && <div className="mt-5">Start your search by typing the title of your favorite Movies or TV Shows...</div>}
          </Tab>
        </Tabs>
      </div>

    </div>
  );
}

export default Search;
