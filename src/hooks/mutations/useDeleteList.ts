const deleteList = async (listId: string) => {
  const { error: list_item_delete_error } = await supabase
    .from("list_items")
    .delete()
    .eq("list_id", listId);

  const { error } = await supabase.from("lists").delete().eq("id", listId);

  if (error || list_item_delete_error) {
    console.error("Error deleting list:", error);
    throw new Error("Failed to delete list.");
  }

  return true;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

export const useDeleteList = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: (listId: string) => deleteList(listId),
    onSuccess: () => {
      enqueueSnackbar({ message: "List deleted" });
      // Invalidate the 'lists' query to refetch the updated list of lists.
      queryClient.invalidateQueries({ queryKey: ["lists"] });
      // You may also want to refetch the items if you're showing all items
      // (including those no longer attached to the deleted list).
    },
    onError: (error) => {
      enqueueSnackbar({ message: error.message, variant: "error" });
      console.error("Deletion failed:", error);
    },
  });
};
