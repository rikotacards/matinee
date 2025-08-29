import { supabase } from "../supbaseClient";

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error);
  } else {
    // optional: redirect the user after successful sign-out
    window.location.href = "/";
    console.log("Successfully signed out!");
  }
}