import { useGetMovieDetailsSwitch } from "../../pages/movieProfile/useGetMovieDetailsSwitch";
import { useGetUserItemByMovieRef } from "../queries/useGetUserItemByMovieRef";
import type { UserItem } from "../queries/useGetUserItems";
import { useAuth } from "../useAuth";
import { useUpsertMovieRef } from "./useUpsertMovieRef";
import { useUpsertUserItem } from "./useUpsertUserItem";

export const useCheckAndPopulateUserItem = (
  movieId: string,
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

  return async (): Promise<UserItem | undefined> => {
    if (!user?.id) {
      throw new Error("Not logged in");
    }
    if (item.data) {
      return item.data;
    }
    if (!item.data) {
      if (hasInternalRef) {
        const res = await upsertUserItem.mutateAsync({
          movie_ref_id: movieDetails.id,
          user_id: user.id,
          status: null,
        });
        return res;
      }
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

      const res = await upsertUserItem.mutateAsync({
        movie_ref_id,
        user_id: user.id,
        status: null,
      });
      return res;
    }
  };
};
