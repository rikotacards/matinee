import { supabase } from "../supbaseClient";

// Function to handle Google sign-in
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      // optional: specify a redirect URL after sign-in
    //   redirectTo: window.location.origin + "/",
    },
  });

  if (error) {
    console.error("Error signing in with Google:", error);
  }
}
