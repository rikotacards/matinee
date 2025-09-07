import {  CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useGetExternalMovieDetailsById } from "../../hooks/queries/useGetExternalMovieDetailsById";
import { MovieProfileHeader } from "./MovieProfileHeader";
interface MovieProfileHeaderProps {
  externalId: string | number;
}

export const MovieProfileHeaderExternalWrapper: React.FC<
  MovieProfileHeaderProps
> = ({ externalId }) => {
  const externalMovieRef = useGetExternalMovieDetailsById(externalId);
  if (externalMovieRef.isLoading) {
    return <CircularProgress />;
  }
  if (!externalMovieRef.data) {
    return <Typography>Can't find data</Typography>;
  }
  return (
    <MovieProfileHeader
      poster_path={externalMovieRef.data.poster_path}
      title={externalMovieRef.data.title}
      release={externalMovieRef.data.release_date}
      movieId={'d'}
    />
  );
};
