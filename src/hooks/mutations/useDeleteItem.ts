
const deleteItem = async (itemId: string) => {
  const { error } = await supabase
    .from("items")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item.");
  }
  
  return true;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => {
      // Invalidate the 'lists' query to refetch the updated list of lists.
      queryClient.invalidateQueries({ queryKey: ["items"] });
      // You may also want to refetch the items if you're showing all items
      // (including those no longer attached to the deleted list).
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Deletion failed:", error);
    },
  });
};