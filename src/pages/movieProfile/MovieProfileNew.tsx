import React from "react";
import { useParams } from "react-router";

import {

  Typography,
} from "@mui/material";

import { ValidMovieProfile } from "./ValidMovieProfile";

export const MovieProfileNew: React.FC = () => {
  const params = useParams();
  const { movie_ref_id, is_internal } = params; // should be general ID.

  if (movie_ref_id !== undefined && is_internal !== undefined) {
    return (
      <ValidMovieProfile
        movie_ref_id={movie_ref_id}
        is_internal={is_internal}
      />
    );
  } else {
    return <Typography>Can't find movie</Typography>;
  }
};
