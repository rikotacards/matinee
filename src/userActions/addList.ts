// Example for a 'movies_watched' table

import { supabase } from "../supbaseClient";

export const addList = async (
  name: string,
  user_id: string
) => {
  const { data, error } = await supabase
    .from('lists')
    .insert([
      {
       name,
       user_id
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