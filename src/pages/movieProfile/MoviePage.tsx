import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useMovieDetails } from "./useGetMovieDetails";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { getImage } from "../../utils/getImage";

import { MoviePageActions } from "./MoviePageActions";
import { PageWrapper } from "../../layouts/PageWrapper";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { Typography } from "@mui/material";
import { BackIconButton } from "../../components/BackIconButton";
interface MoviePageProps {
  movieIdUrl: string;
}
export const MoviePage: React.FC<MoviePageProps> = ({ movieIdUrl }) => {
  const movieDetails = useMovieDetails(movieIdUrl);
  const fullPoster = getImage(movieDetails.data.poster_path || "");
  const internalMovieRef = useGetMovieRef({ id: movieIdUrl });
  const { user } = useAuth();
  // here item is used to display status
  const item = useGetUserItemByMovieRef({
    movieRefId: internalMovieRef.data?.id,
    userId: user?.id,
  });

  return (
    <PageWrapper>
      <BackIconButton/>
      <MovieProfileHeader
        poster_path={fullPoster}
        isLoading={movieDetails.isLoading}
        title={movieDetails.data.title || ""}
        release={movieDetails.data.release || ""}
        movieId={movieDetails.data.id || ""}
      />
      <MoviePageActions
        userItem={item.data}
        movieIdUrl={movieIdUrl}
        isLoading={item.isLoading}
      />
      {movieDetails.isLoading ? (
        <OverviewSkeleton />
      ) : (
        <Typography variant="body2">{movieDetails.data.overview}</Typography>
      )}
    </PageWrapper>
  );
};
