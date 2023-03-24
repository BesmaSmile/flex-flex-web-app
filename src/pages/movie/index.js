import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Error from 'components/Error';
import { ArticleDetails, ArticleDetailsShimmer } from 'components';

function Movie() {
  const { id } = useParams();
  const { movieDetails: { data, loading, error } } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const getMovieDetails = () => {
    dispatch({
      type: 'movies/GET_MOVIE_DETAILS',
      payload: {
        id,
      },
    });
  };
  const getFavorite = () => {
    dispatch({
      type: 'favorite/GET_FAVORITE',
      payload: {
        id,
      },
    });
  };
  useEffect(() => {
    getMovieDetails();
    getFavorite();
  }, []);
  return (
    <div className="movie">
      {loading && <ArticleDetailsShimmer />}
      {!loading && error && <Error message={error} />}
      {loading === false && !error && <ArticleDetails article={{ ...data, category: 'movie' }} />}
    </div>
  );
}

export default Movie;
