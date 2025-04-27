import { useToastNotifications } from '@/hooks';
import { useStore } from '@/store';
import clsx from 'clsx';
import React, { MouseEventHandler, useEffect } from 'react';

type FavoriteButtonProps = {
  article: {
    id: number;
    category: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
  };
  className?: string;
}

function FavoriteButton({ article, className }: FavoriteButtonProps) {
  const {
    id, category,
  } = article;
  const { data: favoriteData } = useStore((state) => state.favorites);

  const isFavorite = favoriteData?.some((article) => article.category === category && article.id === id);
  const addToFavorite = useStore((state) => state.addToFavorites);
  const removeFromFavorite = useStore((state) => state.removeFromFavorites);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (isFavorite) {
      removeFromFavorite(id, category);
    } else {
      addToFavorite(article);
    }
  };
  return (
    <button className={clsx("m-[5px_10px] outline-none bg-transparent border-none", className)} type="button" onClick={handleFavoriteClick}>
      <i className={clsx("text-[25px] text-red-600 cursor-pointer bi",
        { "bi-heart-fill": isFavorite, "bi-heart": !isFavorite }
      )} />
    </button>
  );
}

export default FavoriteButton;
