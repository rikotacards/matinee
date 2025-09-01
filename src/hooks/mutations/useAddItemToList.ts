import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
import { useSnackbar } from "notistack";

interface AddItemToListPayload {
  list_id: string | number;
  item_id: string;
}

/**
 * A custom hook to add an item to a specific list in Supabase.
 * It invalidates the 'items' query key to trigger a refetch of the list data.
 * @returns A mutation object with status, mutate function, etc.
 */
export const useAddItemToList = () => {
  const queryClient = useQueryClient();
  const {enqueueSnackbar} = useSnackbar()
  const mutationFn = async (payload: AddItemToListPayload) => {
    // Insert the new row into the 'list_items' junction table.
    const { data, error } = await supabase
      .from("list_items") // Your junction table name
      .insert([
        {
          list_id: payload.list_id,
          item_id: payload.item_id,
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      enqueueSnackbar({message: 'Added to list', variant:'success'})
      // Invalidate the cache for the specific list to trigger a refetch.
      queryClient.invalidateQueries({ queryKey: ["items", variables.list_id] });
    },
    onError: (e) => {
      enqueueSnackbar({message: e.message, variant: 'error'})
    }
  });
};