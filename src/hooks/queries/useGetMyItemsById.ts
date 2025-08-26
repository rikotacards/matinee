import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supbaseClient';

interface Item {
  // Define your Item interface here
  id: string;
  name: string;
  user_id: string;
  api_id: number;
  // ... other properties
}

/**
 * Custom hook to get a single item by its API ID and a user ID.
 * @param apiId The API ID of the movie.
 * @param userId The ID of the user.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export const useGetItemByApiAndUser = (apiId?: number, userId?: string) => {
  const queryFn = async () => {
    if (!apiId || !userId) {
      return null;
    }

    const { data, error } = await supabase
      .from('items')
      .select('*') // Select all columns from the items table
      .eq('api_id', apiId) // Filter for rows where api_id matches
      .eq('user_id', userId) // Filter for rows where user_id matches
      .single(); // Use single() to get a single row directly, since you expect a unique result

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useQuery<Item | null>({
    queryKey: ['item', apiId, userId],
    queryFn,
    enabled: !!apiId && !!userId,
  });
};