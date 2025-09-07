import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import type { UserItem } from "./useGetUserItems";

/**
 * A custom hook to fetch all items for a specific list, including item details.
 * @param listId The ID of the list to fetch items for.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export const useGetItemsByListId = (listId: string) => {
  const queryFn = async () => {
    if (!listId) {
      return [] as UserItem[]
    }

    // Select from the junction table and join the 'items' table
    const { data, error } = await supabase
      .from("list_items")
      .select('user_item(*)') // This is the key. 'items(*)' means select all columns from the related 'items' table.
      .eq("list_id", listId);

    if (error) {
      throw new Error(error.message);
    }
    if (!data || data.length === 0) {
      return [] as UserItem[]
    }

   return data.map((i) => i.user_item as unknown as UserItem)
  };

  return useQuery<UserItem[] | null>({
    queryKey: ["list_items", listId],
    queryFn,
    enabled: !!listId,
  });
};