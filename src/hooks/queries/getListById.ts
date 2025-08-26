import { supabase } from "../../supbaseClient";

const getListById = async (listId: string) => {
  if (!listId) {
    return null; // Return null if no ID is provided to prevent an unnecessary query.
  }

  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("id", listId)
    .single(); // Use .single() to get a single object instead of an array.

  if (error) {
    console.error("Error fetching list by ID:", error);
    throw new Error("Failed to fetch list.");
  }

  return data;
};

import { useQuery } from "@tanstack/react-query";

export const useGetListById = (listId: string) => {
  return useQuery({
    queryKey: ["lists", listId], // The query key should include the listId to be unique.
    queryFn: () => getListById(listId),
    enabled: !!listId, // The query will only run if listId is a truthy value.
  });
};