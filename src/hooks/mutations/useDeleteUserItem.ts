const deleteItem = async (itemId: string | number) => {
  const { error: userListError } = await supabase
    .from("list_items")
    .delete()
    .eq("item_id", itemId);

  const { error: watchlistError } = await supabase
    .from("watchlist_item")
    .delete()
    .eq("item_id", itemId);

  const { error } = await supabase.from("user_item").delete().eq("id", itemId);

  if (error || watchlistError || userListError) {
    console.error("Error deleting item:", error);
    throw new Error("Failed to delete item.");
  }

  return true;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useAuth } from "../useAuth";
import { useSnackbar } from "notistack";

export const useDeleteUserItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: (itemId: string | number) => deleteItem(itemId),
    onSuccess: () => {
      // You may also want to refetch the items if you're showing all items
      // (including those no longer attached to the deleted list).
      enqueueSnackbar({ message: "Movie removed", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["user_item", user?.id] });
    },
    onError: (error) => {
      console.error("Deletion failed:", error);
    },
  });
};
