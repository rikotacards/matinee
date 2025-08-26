// Assuming 'supabase' is your Supabase client instance

import { supabase } from "../supbaseClient";

export const updateListName = async (listId: string, newListName: string) => {
  const { data, error } = await supabase
    .from('lists') // 1. Select the table
    .update({ list_name: newListName }) // 2. Pass an object with the fields to update
    .eq('id', listId) // 3. Filter to find the row with a matching ID
    .select(); // 4. Return the updated row's data

  if (error) {
    console.error('Error updating list:', error);
    return false;
  }

  console.log('List updated successfully:', data);
  return true;
};