// Example for a 'movies_watched' table

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

interface Arg {
    name: string;
    user_id: string
}
const addList = async (
  arg: Arg
) => {
  const { data, error } = await supabase
    .from('lists')
    .insert([
      {
       name: arg.name,
       user_id: arg.user_id
      },
    ])
    .select(); // `select()` is needed to return the newly inserted row

  if (error) {
    console.error('Error adding movie:', error);
    return null;
  }

  console.log('Movie added successfully:', data);
  return data;
};

export const useAddList = () => {
      const queryClient = useQueryClient()
       const mutation = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['lists'] })
    },
  })

return mutation
}