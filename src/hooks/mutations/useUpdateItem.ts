const updateItem = async ({
  itemId,
  newName,
  newRating,
  date_watched,
  list_id,
  api_id,
  has_watched
}: {
  itemId: string;
  newName?: string;
  newRating?: number;
  date_watched: string | null;
  list_id?: string;
  api_id?: number;
  has_watched?: boolean;
}) => {
  const { data, error } = await supabase
    .from("items")
    .update({
      name: newName,
      rating: newRating,
      date_watched,
      api_id: api_id,
      has_watched,
    }) // Set the new name
    .eq("id", itemId) // Filter for the specific list by its ID
    .select(); // Return the updated row

  if (error) {
    console.error("Error updating list name:", error);
    throw new Error("Failed to update list name.");
  }

  return data;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateItem,
    onSuccess: (data, variables) => {
      // Invalidate the 'lists' query to trigger a refetch.
      // This ensures your UI is updated with the new name.
      queryClient.invalidateQueries({ queryKey: ["items"] });
      // If you have a query for a specific list, you can invalidate it as well.
      queryClient.invalidateQueries({ queryKey: ["items", variables.itemId] });
      queryClient.invalidateQueries({ queryKey: ["items", variables.list_id] });
      console.log("List name updated successfully.");
    },
    onError: (error) => {
      console.error("Failed to update list name:", error);
    },
  });
};
