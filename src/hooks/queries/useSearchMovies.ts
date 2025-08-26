import { useQuery } from '@tanstack/react-query';

export const useSearchMovies = (movieName: string, apiId: string) => {
  // Use a unique query key that includes the search term.
  const queryKey = ['movies', 'search', movieName];

  // The fetch function remains mostly the same.
  const queryFn = async () => {
    if (!movieName || !!apiId.length) return null; // Prevent the query from running if there's no input.

    const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    const encodedQuery = encodeURIComponent(movieName);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedQuery}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  };
  
  // Use useQuery to handle fetching, caching, and state management.
  return useQuery({
    queryKey,
    queryFn,
    // The enabled option prevents the query from running
    // until the user has typed something (i.e., until movieName is not empty).
    enabled: !!movieName,
  });
};