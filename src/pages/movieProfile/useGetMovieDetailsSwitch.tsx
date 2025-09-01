import {
  useGetExternalMovieDetailsById,
  type Movie,
} from "../../hooks/queries/useGetExternalMovieDetailsById";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";

// movie id could be internal, or external when searching from API.
export const useGetMovieDetailsSwitch = (
  moveId: string | number,
  internal: boolean
) => {
  // movie poster, backdrop, release, title
  const internalMovieRef = useGetMovieRef({
    [internal ? "id" : "external_id"]: moveId,
  });
  const externalMovieRef = useGetExternalMovieDetailsById(
    internalMovieRef.data ? undefined : Number(moveId)
  );

  const movieDetails: Movie = {
    id: internalMovieRef.data?.id || externalMovieRef.data?.id || "",
    title: internalMovieRef.data?.title || externalMovieRef.data?.title || "",
    poster_path:
      internalMovieRef.data?.poster_path ||
      externalMovieRef.data?.poster_path ||
      "",
    overview:
      internalMovieRef.data?.overview || externalMovieRef.data?.overview || "",
    release_date:
      internalMovieRef.data?.release ||
      externalMovieRef.data?.release_date ||
      "",
    backdrop_path:
      internalMovieRef.data?.backdrop_path ||
      externalMovieRef.data?.backdrop_path ||
      "",
  };
  return {
    hasInternalRef: !!internalMovieRef.data,
    movieDetails,
    isLoading: externalMovieRef.isLoading || internalMovieRef.isLoading,
  };
};
