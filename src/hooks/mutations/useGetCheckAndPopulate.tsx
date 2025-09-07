import { useMovieDetails } from "../../pages/movieProfile/useGetMovieDetails";
import { useGetMovieRef } from "../queries/useGetMovieRef";
import { useGetUserItemByMovieRef } from "../queries/useGetUserItemByMovieRef";
import type { UserItem } from "../queries/useGetUserItems";
import { useAuth } from "../useAuth";
import { useUpsertMovieRef } from "./useUpsertMovieRef";
import { useUpsertUserItem } from "./useUpsertUserItem";

export const useGetCheckAndPopulate = (id: string | number) => {
  const addMovieRef = useUpsertMovieRef();
  const { user } = useAuth();
  const movieDetails = useMovieDetails(id);
  const internalMovieRef = useGetMovieRef({ id });

  const upsertUserItem = useUpsertUserItem();
  const userItem = useGetUserItemByMovieRef({
    movieRefId: internalMovieRef.data?.id,
    userId: user?.id,
  });
  return async (): Promise<UserItem> => {
    if (!user?.id) {
      throw new Error("no user id");
    }
    let movieId = internalMovieRef.data?.id;
    if (!movieId) {
      movieId = await addMovieRef.mutateAsync({
        external_id: movieDetails.data.id,
        poster_path: movieDetails.data.poster_path,
        backdrop_path: movieDetails.data.backdrop_path,
        title: movieDetails.data.title,
        source: "TMDB",
        release: movieDetails.data.release,
        overview: movieDetails.data.overview || "",
      });
      console.log("creating internal ref", movieId);
    }
    if (!userItem.data) {
      return await upsertUserItem.mutateAsync({
        movie_ref_id: movieId,
        status,
        user_id: user.id,
        rating: 0,
      });
    } else {
      return userItem.data;
    }
  };
};
