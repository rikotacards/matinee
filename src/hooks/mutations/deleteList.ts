
const deleteList = async (listId: string) => {
  const { error } = await supabase
    .from("lists")
    .delete()
    .eq("id", listId);

  if (error) {
    console.error("Error deleting list:", error);
    throw new Error("Failed to delete list.");
  }
  
  return true;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

export const useDeleteList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (listId: string) => deleteList(listId),
    onSuccess: () => {
      // Invalidate the 'lists' query to refetch the updated list of lists.
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      // You may also want to refetch the items if you're showing all items
      // (including those no longer attached to the deleted list).
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Deletion failed:", error);
    },
  });
};