import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

import { RatingDisplay } from "./RatingDisplay";
import { getImage } from "../utils/getImage";
import type { UserItem } from "../hooks/queries/useGetUserItems";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
import { useGetRating } from "../hooks/queries/useGetRating";
import { MovieItemDisplay } from "./MovieItemDisplay";
interface CustomListItemProps {
  item: UserItem;
}

export const MovieItem: React.FC<CustomListItemProps> = ({ item }) => {
  const { movie_ref_id, last_watched_date } = item;
  const { data: movie_ref } = useGetMovieRef({id: movie_ref_id});
  const { data: rating } = useGetRating({
    movie_ref_id,
    user_id: item.user_id,
  });
  const poster = getImage(movie_ref?.poster_path);
  return (
    <MovieItemDisplay
      title={movie_ref?.title || ""}
      fullPosterPath={poster || ""}
      lastWatchDate={last_watched_date}
      rating={rating?.rating}
    />
  );
};
