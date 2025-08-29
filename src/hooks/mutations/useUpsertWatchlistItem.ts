import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

interface WatchlistItem {
  movie_ref_id: string;
  user_id: string;
  item_id: string;
}

/**
 * A custom React Query mutation hook to upsert a user item.
 * @returns A useMutation object with a mutate function for upserting data.
 */
export const useUpsertWatchlistItem = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (movieRef: WatchlistItem): Promise<number> => {
      const { data, error } = await supabase
        .from("watchlist_item")
        .upsert(movieRef)
        .select("id");

      if (error) {
        throw new Error(error.message);
      }
      if (!data || data.length === 0) {
        throw new Error("Upsert operation failed to return an ID.");
      }
      return data[0].id;
    },
    onSuccess: (_,data) => {
        enqueueSnackbar({message: 'Added to watchlist', variant: 'success'})
      // Invalidate the relevant cache after a successful upsert.
      // This ensures any queries that depend on this data are refetched.
      queryClient.invalidateQueries({ queryKey: ["watchlist_items", data.user_id] });
    },
    onError: (e) => {
      enqueueSnackbar({ message: e.message, variant:'error' });
    },
  });
};
