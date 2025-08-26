import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supbaseClient';


/**
 * Custom hook to get a single item by its API ID and a user ID.
 * @param apiId The API ID of the movie.
 * @param userId The ID of the user.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export interface UserItem {
  id: string;
  created_at: string; 
  user_id: string;
  status: string;
  movie_ref_id: string;
  last_watched_date: string;
}
export const useGetUserItems = (userId?: string) => {
  const queryFn = async () => {
    if ( !userId) {
      return null;
    }

    const { data, error } = await supabase
      .from('user_item')
      .select('*') // Select all columns from the items table
      .eq('user_id', userId) // Filter for rows where user_id matches
      .select(); // Use single() to get a single row directly, since you expect a unique result

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useQuery<UserItem[] | null>({
    queryKey: ['items', userId],
    queryFn,
    enabled: !!userId,
  });
};