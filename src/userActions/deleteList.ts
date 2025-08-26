// Assuming 'supabase' is your Supabase client instance

import { supabase } from "../supbaseClient";

export const deleteList = async (id: string) => {
  const { error } = await supabase
    .from('lists') // 1. Select the table
    .delete() // 2. Call the delete method
    .eq('id', id); // 3. Filter to find the row with a matching ID

  if (error) {
    console.error('Error deleting movie:', error);
    return false;
  }

  console.log('Movie deleted successfully!');
  return true;
};