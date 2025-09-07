import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";
import type { UserItem } from "../queries/useGetUserItems";

export interface UpdateUserItem {
  updatePayload: Partial<UserItem>;
  itemId: string;
  userId: string;
  movieRefId: string | number;
  rating?: number | null;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpdateUserItem = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (args: UpdateUserItem) => {
      console.log("update", args);
      const { data, error } = await supabase
        .from("user_item")
        .update(args.updatePayload)
        .eq("id", args.itemId)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },

    onSuccess: (_, data) => {
      console.log("data", data);
      // Invalidate the relevant cache after a successful upsert.
      // This ensures any queries that depend on this data are refetched.
      enqueueSnackbar({ message: "Updated", variant: "success" });
      queryClient.invalidateQueries({
        queryKey: ["user_item", data.userId, data.movieRefId],
      });
      queryClient.invalidateQueries({
        queryKey: ["useGetUserItemByMovieRef", data.userId, data.movieRefId],
      });
    },
    onError: () => {
      enqueueSnackbar({ message: "Failed to update movie", variant: "error" });
    },
  });
};
