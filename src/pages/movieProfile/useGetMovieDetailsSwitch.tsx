import { useGetExternalMovieDetailsById, type Movie } from "../../hooks/queries/useGetMovieById";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";


export const useGetMovieDetailsSwitch = (externalId: number, internal: boolean) => {
  // movie poster, backdrop, release, title
  const movieRef = useGetMovieRef({ [internal ? 'id' : 'external_id']: externalId });
  const externalMovieRef = useGetExternalMovieDetailsById(
    movieRef.data ? undefined : externalId
  );
  const movieDetails: Movie = {
    id: movieRef.data?.id || externalMovieRef.data?.id || 0,
    title: movieRef.data?.title || externalMovieRef.data?.title || "",
    poster_path: movieRef.data?.poster_path || externalMovieRef.data?.poster_path || "",
    overview: movieRef.data?.overview || externalMovieRef.data?.overview || "", 
    release: movieRef.data?.release || externalMovieRef.data?.release_date || "",
    backdrop_path: movieRef.data?.backdrop_path || externalMovieRef.data?.backdrop_path || ""
  }
  return {hasInternalRef: !!movieRef.data, movieDetails}
};
