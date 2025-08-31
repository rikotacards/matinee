import React from "react";
import { useParams } from "react-router";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { useGetExternalMovieDetailsById } from "../../hooks/queries/useGetMovieById";
import { useGetMovieDetailsSwitch } from "./useGetMovieDetailsSwitch";
import { MovieProfileHeader } from "./MovieProfileHeader";
import { Box, Typography } from "@mui/material";
import { useGetUserItemByMovieRef } from "../../hooks/queries/useGetUserItemByMovieRef";
import { useAuth } from "../../hooks/useAuth";
import { useUpsertUserItem } from "../../hooks/mutations/useUpsertUserItem";
import { useUpsertMovieRef } from "../../hooks/mutations/useUpsertMovieRef";
import { getImage } from "../../utils/getImage";
import { useUpdateUserItem } from "../../hooks/mutations/useUpdateUserItem";

export const MovieProfileNew: React.FC = () => {
  const params = useParams();
  const { user } = useAuth();
  const { movie_ref_id, is_internal } = params; // should be id
  const externalId = Number(movie_ref_id); // might not be exteranl id
  console.log("externalId", is_internal);
  const upsertMovieRef = useUpsertMovieRef();
  const { hasInternalRef, movieDetails } = useGetMovieDetailsSwitch(
    externalId,
    is_internal === "true"
  );
  const item = useGetUserItemByMovieRef({
    userId: user?.id,
    movieRefId: hasInternalRef ? movieDetails.id : undefined,
  });
  console.log('ITEM', item.data)
  const update = useUpdateUserItem();
  const upsertUserItem = useUpsertUserItem();
  const fullPoster = getImage(movieDetails.poster_path);
  console.log(movieDetails)
  const onUpdate = async (status?: string) => {
    if (!user?.id) {
      throw new Error("user not logged in");
    }
    if (!hasInternalRef) {
      const movie_ref_id = await upsertMovieRef.mutateAsync({
        overview: movieDetails.overview,
        external_id: movieDetails.id,
        source: "TMDB",
        release: movieDetails.release,
        poster_path: movieDetails.poster_path,
        backdrop_path: movieDetails.backdrop_path,
        title: movieDetails.title,
      });
      if (!item.data) {
        upsertUserItem.mutateAsync({ movie_ref_id, user_id: user.id, status });
      }
    }
  };
  if (!externalId) {
    return <Typography>Invalid</Typography>;
  }
  return (
    <Box>
      <MovieProfileHeader
        poster_path={fullPoster}
        release={movieDetails.release}
        title={movieDetails.title}
        item={item.data}
        onUpdate={onUpdate}
        movieId={externalId}
      />
    </Box>
  );
};
