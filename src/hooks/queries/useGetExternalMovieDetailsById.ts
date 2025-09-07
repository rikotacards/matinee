import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export interface Movie {
  id: number | string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  // Add more properties as needed from the TMDb API response
}

/**
 * A custom hook to fetch a single movie by its ID from the TMDb API.
 * @param movieId The unique ID of the movie to fetch.
 * @returns A UseQueryResult object with the movie data, loading state, and error state.
 */
export const useGetExternalMovieDetailsById = (
  movieId?: number | string,
): UseQueryResult<Movie> => {
  // Use a unique query key that includes the movie ID. This is crucial for caching.
  const queryKey = ["movie", movieId];

  const queryFn = async (): Promise<Movie> => {
    if (!movieId) {
      throw new Error("Movie ID is required.");
    }

    // Access the API read access token from your environment variables.
    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error(
        "TMDB access token is not defined in environment variables."
      );
    }

    const url = `https://api.themoviedb.org/3/movie/${movieId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.status_message || "Failed to fetch movie details."
      );
    }

    return response.json();
  };

  // The useQuery hook manages the fetching, caching, and state.
  return useQuery({
    queryKey,
    queryFn,
    // The enabled property prevents the query from running if movieId is not provided.
    enabled: !!movieId,
  });
};
