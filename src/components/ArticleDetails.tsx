import React, { useState } from 'react';
import moment from 'moment';
import FavoriteButton from './FavoriteButton';
import RatingStars from './RatingStars';
import { apiConfig } from '@/config';
import VideoPlayer from './VideoPlayer';
import cinema from '@/assets/img/cinema.png';
import cinemaWhite from '@/assets/img/cinema-white.png';
import Image from 'next/image';

type ArticleDetailsProps = {
  article: {
    id: number;
    category: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
    title: string;
    name: string;
    release_date?: string;
    first_air_date?: string;
    homepage?: string;
    videos: {
      results: Array<{
        key: string;
        site: string;
        type: string;
        official: boolean;
        name: string;
      }>
    }
    genres: Array<{ id: number; name: string }>,
    production_companies: Array<{
      id: number; name: string; logo_path?: string
    }>
  };
};

function ArticleDetails({ article }: ArticleDetailsProps) {
  const {
    poster_path, overview, vote_average, genres, production_companies, category, homepage,
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
    <div className="mt-5">
      <div className="m-[40px] flex flex-row">
        <div className="mr-3">
          {poster_path !== null ? (
            <Image width={270} height={405} className="rounded-lg w-[270px] min-w-[270px]" src={imagePath} alt={title} />
          ) : (
            <div className="flex justify-center items-center w-[270px] h-[405px] rounded-lg p-2.5 border border-gray-400 bg-[#2d2260]">
              <Image className="w-[50px] h-auto" src={cinemaWhite} alt={title} />
            </div>
          )}
          <div className='mt-[10px] flex flex-row justify-between items-center'>

            <a
              onClick={handlePlayTrailerClick}
              href="#trailer"
              className={`flex flex-row items-center text-[#1b3957] no-underline ${!video ? 'text-[#1b39576f] cursor-not-allowed' : ''}`}
              type="button"
            >
              <i className="bi bi-play-fill text-4xl" />
              <div>Play trailer</div>
            </a>
            <a
              className={`flex flex-row items-center text-[#1b3957] mr-[5px] ${!homepage ? 'text-[#1b39576f] cursor-not-allowed' : ''}`}
              href={homepage}
              target="_blank"
            >
              <i className="bi bi-globe text-xl" />
            </a>
          </div>

        </div>

        <div>
          <div className="flex flex-row justify-between items-start">
            <div className="font-bold text-3xl">{title}</div>
            <FavoriteButton article={article} />
          </div>

          <div className="font-light">{formatedDate}</div>

          <RatingStars value={vote_average / 2} />

          <div className="mt-3">
            <div className="font-extralight text-lg mb-2.5">Overview</div>
            <p title={overview} className="text-sm">{overview}</p>
          </div>

          {genres.length > 0 && (
            <div className="mt-4">
              <div className="font-extralight text-lg mb-2.5">Genres</div>
              <div className="flex flex-wrap">
                {genres.map(({ id, name }) => (
                  <span
                    key={id}
                    className="bg-gray-500 text-white px-2 py-1 text-xs rounded mr-1 mb-1"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {production_companies.length > 0 && (
            <div className="mt-3">
              <div className="font-extralight text-lg mb-2.5">Production companies</div>
              <div className="flex flex-row flex-wrap">
                {production_companies.map(({ id, name, logo_path }) => (
                  <div key={id} className="flex flex-col items-center m-2">
                    {logo_path ? (
                      <Image
                        width={50} height={30}
                        className="h-15 max-w-[100px] object-contain mr-4"
                        src={`${apiConfig.imgUrl}${logo_path}`}
                        alt={name}
                      />
                    ) : (
                      <Image
                        className="h-[30px] w-[30px] m-[15px]"
                        src={cinema}
                        alt={name}
                      />
                    )}
                    <div className="font-extralight text-xs text-[#1b3957] mt-1">{name}</div>
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
