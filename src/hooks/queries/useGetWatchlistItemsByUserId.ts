import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import type { UserItem } from "./useGetUserItems";


interface Args {
  userId?: string
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

    
    console.log('data', data)
    return data.map((i) => i.user_item as unknown as UserItem);
  };

  return useQuery<UserItem[]>({
    queryKey: ["watchlist_items", userId],
    queryFn,
    enabled: !!userId
  });
};
