import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import FavoriteButton from 'components/FavoriteButton';
import RatingStars from 'components/RatingStars';
import cinemaWhite from 'assets/img/cinema-white.png';
import { apiConfig } from 'config';
import './style.scss';

function ArticleCard({
  article,
}) {
  const {
    id, category, poster_path, overview, vote_average,
  } = article;

  const imagePath = poster_path && `${apiConfig.imgUrl}/${poster_path}`;
  const title = category === 'movie' ? article.title : article.name;
  const date = category === 'movie' ? article.release_date : article.first_air_date;
  const formatedDate = date && moment(date).format('MMM DD, YYYY');
  return (
    <Link className="article-card" to={`/${category}/${id}`}>
      {poster_path !== null ? <img src={imagePath} alt={title} /> : (
        <div className="empty-poster d-flex flex-column">
          <p>{title}</p>
          <div className="d-flex justify-content-center align-items-center">
            <img src={cinemaWhite} alt={title} />
          </div>

        </div>
      )}
      <FavoriteButton article={article} />
      <div className="info">
        <div className="article-title">{title}</div>
        <div className="overview">
          <p title={overview}>{overview}</p>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <div>
            <RatingStars value={vote_average / 2} />
            <span className="rating">{vote_average}</span>
          </div>
          <div className="date">
            {formatedDate}
          </div>
        </div>

      </div>

    </Link>
  );
}

export default ArticleCard;
