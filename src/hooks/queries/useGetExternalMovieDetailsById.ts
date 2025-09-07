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
      const error = new Error(
        errorData.status_message || "Failed to fetch movie details."
      ) as any; // Cast to 'any' to add a custom property
      error.statusCode = response.status; // Add the status code to the error object
      throw error;
    }

    return response.json();
  };

  // The useQuery hook manages the fetching, caching, and state.
  return useQuery({
    queryKey,
    queryFn,
    retry: (failureCount, error) => {
      // Check if the error has a statusCode property and if it's 404.
      if ((error as any).statusCode === 404) {
        return false; // Do not retry for 404 Not Found errors.
      }
      // Otherwise, retry up to 3 times (or your desired number).
      return failureCount < 3;
    },
    // The enabled property prevents the query from running if movieId is not provided.
    enabled: !!movieId,
  });
};
