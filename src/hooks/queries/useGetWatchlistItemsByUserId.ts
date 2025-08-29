import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import type { UserItem } from "./useGetUserItems";

/**
 * Custom hook to get a single item by its API ID and a user ID.
 * @param apiId The API ID of the movie.
 * @param userId The ID of the user.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export interface WatchlistItem {
  id: string;
  created_at: string;
  user_id: string;
  status: string;
  movie_ref_id: string;
}
interface Args {
  userId: string
}
export const useGetUserItemsFromWatchlistByUserId = (args: Args) => {
  const { userId } = args;
  const queryFn = async () => {
   

    const { data, error } = await supabase
      .from("watchlist_item")
      .select("user_item(*)") // Select all columns from the items table
      .eq("user_id", userId);

    if (error) {
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      return [] as UserItem[];
    }

    return data.map((i) => i.user_item as unknown as UserItem);
  };

  return useQuery<UserItem[]>({
    queryKey: ["watchlist_items", userId],
    queryFn,
  });
};
