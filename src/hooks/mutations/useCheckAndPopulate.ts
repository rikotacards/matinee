import React from "react";
import { useGetMovieDetailsSwitch } from "../../pages/movieProfile/useGetMovieDetailsSwitch";
import { useGetUserItemByMovieRef } from "../queries/useGetUserItemByMovieRef";
import { useAuth } from "../useAuth";
import { useUpsertMovieRef } from "./useUpsertMovieRef";
import { useUpsertUserItem } from "./useUpsertUserItem";
import type { UserItem } from "../queries/useGetUserItems";

export const useCheckAndPopulate = async (
  movieId: number,
  isInternal: boolean
) => {
  const { user } = useAuth();
  const upsertMovieRef = useUpsertMovieRef();
  const upsertUserItem = useUpsertUserItem();

  const { hasInternalRef, movieDetails } = useGetMovieDetailsSwitch(
    movieId,
    isInternal
  );
  const item = useGetUserItemByMovieRef({
    userId: user?.id,
    movieRefId: hasInternalRef ? movieDetails.id : undefined,
  });
  if (!user?.id) {
    return;
  }
  return () => {
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
        upsertUserItem.mutateAsync({ movie_ref_id, user_id: user.id });
      }
    }
  };
};
