import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supbaseClient";
// Assume you have your Supabase client initialized and a userId variable.

const getLists = async (userId: string) => {
  const { data, error } = await supabase
    .from("lists") // 1. Select the 'lists' table.
    .select("*") // 2. Select all columns in the table.
    .eq("user_id", userId); // 3. Filter the results to only include lists belonging to the user.

  if (error) {
    console.error("Error fetching lists:", error);
    return [];
  }

  console.log("User lists:", data);
  return data;
};

// Example usage:
// const userId = 'your-user-id';
// fetchUserLists(userId);
export const useGetLists = (userId: string) => {
  // Queries
  const query = useQuery({
    queryKey: ["lists", userId],
    queryFn: () => getLists(userId),
    enabled: !!userId
  });
  return query;
};
