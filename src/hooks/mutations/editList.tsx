const updateListName = async ({
  listId,
  newName,
}: {
  listId: string;
  newName: string;
}) => {
  const { data, error } = await supabase
    .from("lists")
    .update({ name: newName }) // Set the new name
    .eq("id", listId) // Filter for the specific list by its ID
    .select(); // Return the updated row

  if (error) {
    console.error("Error updating list name:", error);
    throw new Error("Failed to update list name.");
  }

  return data;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

export const useUpdateListName = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateListName,
    onSuccess: (data, variables) => {
      // Invalidate the 'lists' query to trigger a refetch.
      // This ensures your UI is updated with the new name.
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      // If you have a query for a specific list, you can invalidate it as well.
      queryClient.invalidateQueries({ queryKey: ["lists", variables.listId] });
      console.log("List name updated successfully.");
    },
    onError: (error) => {
      console.error("Failed to update list name:", error);
    },
  });
};
