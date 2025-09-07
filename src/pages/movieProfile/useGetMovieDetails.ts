import { useGetExternalMovieDetailsById } from "../../hooks/queries/useGetExternalMovieDetailsById";
import {
  useGetMovieRef,
  type MovieRef,
} from "../../hooks/queries/useGetMovieRef";

export const useMovieDetails = (movieId: string | number) => {
  const external = useGetExternalMovieDetailsById(movieId);
  const internal = useGetMovieRef({
    id: movieId,
  });

  return {
    isLoading: internal.isLoading || external.isLoading,
    data:
      internal.data ||
      ({ ...external.data, release: external.data?.release_date } as MovieRef),
  };
};
