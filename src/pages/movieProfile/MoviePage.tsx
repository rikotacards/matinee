import React from "react";
import { Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useMovieDetails } from "./useGetMovieDetails";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { getImage } from "../../utils/getImage";

import { MoviePageActions } from "./MoviePageActions";
interface MoviePageProps {
  movieIdUrl: string;
}
export const MoviePage: React.FC<MoviePageProps> = ({ movieIdUrl }) => {
  const movieDetails = useMovieDetails(movieIdUrl);

  const fullPoster = getImage(movieDetails.poster_path || "");
  const internalMovieRef = useGetMovieRef({ id: movieIdUrl });
  const { user } = useAuth();
  // here item is used to display status
  const item = useGetUserItemByMovieRef({
    movieRefId: internalMovieRef.data?.id,
    userId: user?.id,
  });

  return (
    <Box>
      {item.data?.id ? "yes" : "no"}
      <MovieProfileHeader
        poster_path={fullPoster}
        title={movieDetails.title || ""}
        release={movieDetails.release || ""}
        movieId={movieDetails.id || ""}
      />
      {movieDetails.overview}

      <MoviePageActions
        userItem={item.data}
        movieIdUrl={movieIdUrl}
        isLoading={item.isLoading}
      />
    </Box>
  );
};
