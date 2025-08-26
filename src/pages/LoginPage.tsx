import { Box, Button, CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect } from "react";
import { signInWithGoogle } from "../userActions/signInWithGoogle";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const LoginPage: React.FC = () => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  console.log("Login page, session", session, loading)
  // Redirect to dashboard if the user is logged in
  useEffect(() => {
    if (!loading && session) {
      console.log('ya')
      navigate("/", { replace: true });
    }
  }, [session, navigate, loading]);
  if (loading) {
    return <CircularProgress sx={{width:'100%'}} />;
  }
  return (
    <Box>
      <Button variant="contained" onClick={signInWithGoogle}>
        Login
      </Button>
    </Box>
  );
};
