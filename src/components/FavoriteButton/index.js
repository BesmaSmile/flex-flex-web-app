import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

function FavoriteButton({ article }) {
  const {
    id, category, overview, poster_path, vote_average,
  } = article;
  const { data: favoriteData } = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  const isFavorite = favoriteData?.some((a) => a.category === category
    && a.id === id);

  const addToFavorite = () => {
    let articlePayload = {
      id,
      category,
      overview,
      poster_path,
      vote_average,
    };
    if (category === 'movie') {
      articlePayload = { ...article, title: article.title, release_date: article.release_date };
    } else {
      articlePayload = { ...article, name: article.name, first_air_date: article.first_air_date };
    }
    dispatch({
      type: 'favorite/ADD_TO_FAVORITE',
      payload: articlePayload,
    });
  };
  const removeFromFavorite = () => {
    dispatch({
      type: 'favorite/REMOVE_FROM_FAVORITE',
      payload: {
        id,
        category,
      },
    });
  };
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isFavorite) {
      removeFromFavorite();
    } else {
      addToFavorite();
    }
  };
  return (
    <button className="favorite-button" type="button" onClick={handleFavoriteClick}>
      {isFavorite ? <i className="favorite-icon bi bi-heart-fill" /> : <i className="favorite-icon bi bi-heart" />}
    </button>
  );
}

export default FavoriteButton;
