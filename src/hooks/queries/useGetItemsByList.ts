import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

/**
 * A custom hook to fetch all items for a specific list, including item details.
 * @param listId The ID of the list to fetch items for.
 * @returns A UseQueryResult object with the data, loading, and error states.
 */
export const useGetItemsByList = (listId: string) => {
  const queryFn = async () => {
    console.log('lis', listId)
    if (!listId) {
      return [];
    }

    // Select from the junction table and join the 'items' table
    const { data, error } = await supabase
      .from("list_items")
      .select("items(*)") // This is the key. 'items(*)' means select all columns from the related 'items' table.
      .eq("list_id", listId);

    if (error) {
      throw new Error(error.message);
    }
    if (!data || data.length === 0) {
      return [];
    }

   return data
      .filter((row) => row.items !== null)
      .map((row) => row.items);
  };

  return useQuery({
    queryKey: ["items", listId],
    queryFn,
    enabled: !!listId,
  });
};