const deleteWatchlistItem = async ({
  movie_ref_id,
  user_id,
}: {
  movie_ref_id: string | number;
  user_id: string;
}) => {
  const { error } = await supabase
    .from("watchlist_item")
    .delete()
    .eq("movie_ref_id", movie_ref_id)
    .eq("user_id", user_id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { enqueueSnackbar } from "notistack";
import { BookmarkBorder } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export const useDeleteWatchlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWatchlistItem,
    onSuccess: (_, data) => {
      enqueueSnackbar({
        message: <Stack direction='row' alignItems={'center'}>
          <BookmarkBorder/><Typography>Removed from watchlist</Typography>
        </Stack>
      });
      queryClient.invalidateQueries({ queryKey: ["watchlist_items", data.user_id] });
      // You may also want to refetch the items if you're showing all items
    },
    onError: (error) => {
        enqueueSnackbar({message: error.message, variant: 'error'})
    
    },
  });
};
