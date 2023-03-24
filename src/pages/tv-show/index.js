import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Error from 'components/Error';
import { ArticleDetails, ArticleDetailsShimmer } from 'components';

function TvShow() {
  const { id } = useParams();
  const { tvShowDetails: { data, loading, error } } = useSelector((state) => state.tvShows);
  const dispatch = useDispatch();

  const getTvShowDetails = () => {
    dispatch({
      type: 'tvShows/GET_TV_SHOW_DETAILS',
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
    getTvShowDetails();
    getFavorite();
  }, []);
  return (
    <div className="tv-show">
      {loading && <ArticleDetailsShimmer />}
      {!loading && error && <Error message={error} />}
      {loading === false && !error && <ArticleDetails article={{ ...data, category: 'tv-show' }} />}
    </div>
  );
}

export default TvShow;
