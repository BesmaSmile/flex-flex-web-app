import React, { useState } from 'react';
import moment from 'moment';
import FavoriteButton from 'components/FavoriteButton';
import RatingStars from 'components/RatingStars';
import { apiConfig } from 'config';
import VideoPlayer from 'components/VideoPlayer';
import cinema from 'assets/img/cinema.png';
import cinemaWhite from 'assets/img/cinema-white.png';
import './style.scss';

function ArticleDetails({ article }) {
  const {
    poster_path, overview, vote_average, genres, production_companies, category,
  } = article;
  const imagePath = `${apiConfig.imgUrl}${poster_path}`;
  const title = category === 'movie' ? article.title : article.name;
  const date = category === 'movie' ? article.release_date : article.first_air_date;
  const formatedDate = date && moment(date).format('MMM DD, YYYY');
  const video = article.videos.results.find(({ site, type, official }) => official && site === 'YouTube' && type === 'Trailer');

  const [play, setPlay] = useState(false);
  const handlePlayTrailerClick = () => {
    setPlay(true);
  };
  return (
    <div className="article-details">
      <div className="p-5 d-flex flex-row">
        <div className="me-3">
          {poster_path !== null ? <img src={imagePath} alt={title} /> : (
            <div className="empty-poster d-flex justify-content-center align-items-center">
              <img src={cinemaWhite} alt={title} />
            </div>
          )}
          <a onClick={handlePlayTrailerClick} href="#trailer" className={`play-button d-flex flex-row align-items-center ${!video ? 'disabled' : ''}`} type="button">
            <i className="bi bi-play-fill play-icon" />
            <div>Play trailer</div>
          </a>
        </div>
        <div>
          <div className="d-flex flex-row justify-content-between">

            <div className="title">{title}</div>
            <FavoriteButton article={article} />
          </div>
          <div className="date">
            {formatedDate}
          </div>
          <RatingStars value={vote_average / 2} />

          <div className="overview mt-3">
            <div className="subtitle">Overview</div>
            <p title={overview}>{overview}</p>
          </div>
          {genres.length > 0 && (
            <div className="mt-4">
              <div className="subtitle">genres</div>
              {genres?.map(({ id, name }) => (
                <span className="genre" key={id}>
                  {name}
                </span>
              ))}
            </div>
          )}
          {production_companies.length > 0 && (
            <div className="mt-3">
              <div className="subtitle">Production companies</div>
              <div className="d-flex flex-row">
                {production_companies?.map(({ id, name, logo_path }) => (
                  <div key={id} className="d-flex flex-column align-items-center m-2">
                    {logo_path ? <img className="small-img" src={`${apiConfig.imgUrl}${logo_path}`} alt={name} />
                      : <img className="cinema-img" src={cinema} alt={name} />}
                    <div className="company-name">{name}</div>
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>
      </div>
      {video && (
        <div id="trailer">
          <VideoPlayer title={video.name} id={video.key} site={video.site} play={play} />
        </div>
      )}
    </div>

  );
}

export default ArticleDetails;
