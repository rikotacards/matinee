import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";
import type { UserItem } from "../queries/useGetUserItems";

export interface UpdateUserItem {
  updatePayload: Partial<UserItem>;
  itemId: string;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpdateUserItem = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (args: UpdateUserItem) => {
      const { data, error } = await supabase
        .from("user_item")
        .update( args.updatePayload)
        .eq("id", args.itemId)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (_, data) => {
      // Invalidate the relevant cache after a successful upsert.
      // This ensures any queries that depend on this data are refetched.
      enqueueSnackbar({ message: "Updated", variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["user_item"] });
    },
    onError: (e) => {
        enqueueSnackbar({message: 'Failed to update movie', variant:'error'})
    }
  });
};
