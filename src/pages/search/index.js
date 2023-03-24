import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Tabs, InfiniteScroll, ArticleCardShimmers, ArticleCard,
} from 'components';
import './style.scss';
import NoResult from 'components/NoResult';

function Search() {
  const { moviesSearchResults } = useSelector((state) => state.movies);
  const { tvShowsSearchResults } = useSelector((state) => state.tvShows);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchText, setSearchText] = useState(query ?? '');

  const dispatch = useDispatch();

  const getFavorite = () => {
    dispatch({
      type: 'favorite/GET_FAVORITE',
    });
  };

  const searchMovies = (forceNewSearch) => {
    dispatch({
      type: 'movies/SEARCH_MOVIES',
      payload: {
        query: searchText,
        forceNewSearch,
      },
    });
  };

  const searchTvShows = (forceNewSearch) => {
    dispatch({
      type: 'tvShows/SEARCH_TV_SHOWS',
      payload: {
        query: searchText,
        forceNewSearch,
      },
    });
  };

  const search = (forceNewSearch) => {
    if (searchText.length > 0) {
      searchMovies(forceNewSearch);
      searchTvShows(forceNewSearch);
    }
  };

  useEffect(() => {
    getFavorite();
    if (query?.length > 0) {
      search(true);
    } else if (moviesSearchResults.query?.length > 0) {
      setSearchParams({ query: moviesSearchResults.query });
      setSearchText(moviesSearchResults.query);
      search(true);
    }
  }, []);

  const handleSeachTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchClick = () => {
    setSearchParams({ query: searchText });
    search(true);
  };

  return (
    <div className="search d-flex flex-column align-items-center m-5">

      <div className="col-11 d-flex">
        <div className="col-6">
          <div className="input-group">

            <input type="text" value={searchText} onChange={handleSeachTextChange} className="form-control" id="validationDefaultUsername" placeholder="Movies, TV Shows, and more..." aria-describedby="inputGroupPrepend2" />
            <div className="input-group-prepend">
              <button onClick={handleSearchClick} disabled={searchText.length === 0} type="button" className="btn btn-outline-light input-group-text" id="inputGroupPrepend2">
                <i className="bi bi-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-11 mt-4">
        <Tabs>
          <div id="movies" label="Movies">
            <InfiniteScroll
              state={moviesSearchResults}
              pageSize={20}
              loadData={searchMovies}
              Shimmer={ArticleCardShimmers}
            >
              {moviesSearchResults.data.map((movie) => (
                <ArticleCard key={movie.id} article={{ ...movie, category: 'movie' }} />
              ))}
            </InfiniteScroll>
            {query?.length > 0 && moviesSearchResults.loading === false && !moviesSearchResults.error && moviesSearchResults.data.length === 0 && <NoResult message="No result" />}
            {!query?.length && <div className="mt-5">Start your search by typing the title of your favorite Movies or TV Shows...</div>}
          </div>
          <div id="tv-shows" label="Tv Shows">
            <InfiniteScroll
              state={tvShowsSearchResults}
              pageSize={20}
              loadData={searchTvShows}
              Shimmer={ArticleCardShimmers}
            >
              {tvShowsSearchResults.data.map((movie) => (
                <ArticleCard key={movie.id} article={{ ...movie, category: 'tv-show' }} />
              ))}
            </InfiniteScroll>
            {query?.length > 0 && tvShowsSearchResults.loading === false && !tvShowsSearchResults.error && tvShowsSearchResults.data.length === 0 && <NoResult message="No result" />}
            {!query?.length && <div className="mt-5">Start your search by typing the title of your favorite Movies or TV Shows...</div>}
          </div>
        </Tabs>
      </div>

    </div>
  );
}

export default Search;
