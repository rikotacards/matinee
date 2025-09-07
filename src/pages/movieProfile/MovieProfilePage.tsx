import { Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { MoviePage } from "./MoviePage";

export const MovieProfilePage: React.FC = () => {
  const params = useParams();
  const { movie_ref_id } = params; // should be general ID.

  if (!movie_ref_id) {
    return <Typography>Can't find movie</Typography>;
  }
  return <MoviePage movieIdUrl={movie_ref_id}/>
};
