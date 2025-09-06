import React from "react";

import { getImage } from "../utils/getImage";
import type { UserItem } from "../hooks/queries/useGetUserItems";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
import { MovieItemDisplay } from "./MovieItemDisplay";
import { MovieItemSkeleton } from "./MovieItemSkeleton";
interface CustomListItemProps {
  item: UserItem;
}

export const MovieItem: React.FC<CustomListItemProps> = ({ item }) => {
  const { movie_ref_id, last_watched_date, rating } = item;
  const { data: movie_ref, isLoading } = useGetMovieRef({id: movie_ref_id});
  
  const poster = getImage(movie_ref?.poster_path);
  if(isLoading){
    return <MovieItemSkeleton/>
  }
  return (
    <MovieItemDisplay
      title={movie_ref?.title || ""}
      fullPosterPath={poster || ""}
      lastWatchDate={last_watched_date}
      rating={rating|| 0}
    />
  );
};
