// Example for a 'movies_watched' table

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";

interface Arg {
  name: string;
  user_id: string;
  rating: number;
  date_watched: string | null; // YYYY-MM-DD
  api_id?: number;
  has_watched?: boolean;
}

const addItem = async (arg: Arg) => {
  const { data, error } = await supabase
    .from("items")
    .insert([
      {
        name: arg.name,
        user_id: arg.user_id,
        rating: arg.rating,
        date_watched: arg.date_watched,
        api_id: arg.api_id,
        has_watched: arg.has_watched || false
      },
    ])
    .select("id"); // `select()` is needed to return the newly inserted row

  if (error) {
    console.error("Error adding movie:", error);
    return null;
  }

  console.log("Movie added successfully:", data);
  return data ? data[0].id : null; 
};

export const useAddItem = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  return mutation;
};
