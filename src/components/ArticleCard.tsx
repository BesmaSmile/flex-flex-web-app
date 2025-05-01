import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import FavoriteButton from './FavoriteButton';
import RatingStars from './RatingStars';
import cinemaWhite from '@/assets/img/cinema-white.png';
import { apiConfig } from '@/config';
import clsx from 'clsx';


type ArticleCardProps = {
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
  };
  className?: string;
};
function ArticleCard({ article, className }: ArticleCardProps) {
  const {
    id, category, poster_path, overview, vote_average,
  } = article;

  const imagePath = poster_path ? `${apiConfig.imgUrl}/${poster_path}` : "";
  const title = category === 'movie' ? article.title : article.name;
  const date = category === 'movie' ? article.release_date : article.first_air_date;
  const formatedDate = date && moment(date).format('MMM DD, YYYY');
  return (
    <Link className={clsx("relative w-[250px] h-[375px] rounded-[10px] overflow-hidden cursor-pointer text-[#495057] no-underline group", className)} href={`/${category}/${id}`}>
      {poster_path !== null ? <Image fill className='w-full h-full object-cover' src={imagePath} alt={title} /> : (
        <div className="flex flex-col">
          <p>{title}</p>
          <div className="flex justify-center items-center">
            <Image className='w-full h-full object-cover' src={cinemaWhite} alt={title} />
          </div>

        </div>
      )}
      <FavoriteButton article={article} className='absolute top-0 right-0' />
      <div className="absolute bottom-0 left-0 right-0 max-h-0 overflow-hidden bg-[hsla(0,2%,9%,0.7)] group-hover:max-h-[500px] group-hover:p-5 transition-all duration-300 ease-in">
        <div className="text-white font-bold">{title}</div>
        <div className="max-h-[100px] overflow-hidden mt-2">
          <p className='text-white/60 font-light text-[12px] text-ellipsis overflow-hidden line-clamp-3' title={overview}>{overview}</p>
        </div>
        <div className="flex flex-row justify-between">
          <div className='flex flex-col items-center'>
            <div className='mt-1'><RatingStars value={vote_average / 2} /></div>
            <span className="text-[#f5c43d94] font-light text-[12px]">{vote_average}</span>
          </div>
          <div className="text-white font-medium text-sm text-right mt-2">
            {formatedDate}
          </div>
        </div>

      </div>

    </Link>
  );
}

export default ArticleCard;
