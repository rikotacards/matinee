import { Button, CircularProgress, Typography } from "@mui/material";
import { PageWrapper } from "../layouts/PageWrapper";
import { useSignIn } from "../hooks/useSignIn";
import React from "react";

export const UnAuthedList: React.FC = () => {
  const signIn = useSignIn()
  const [loading, setLoading] = React.useState(false);
  const onClick = async() => {
    setLoading(true)
    await signIn.mutateAsync()
  }
  return (
    <PageWrapper pageName="Lists">
      <Typography fontWeight={'bold'} variant="h3">
        Sign up to create your own movie lists
      </Typography>
      <Button loading={loading} onClick={onClick} sx={{mt:2}} fullWidth color="success" variant="contained">
        {loading ?<CircularProgress size={20}/> : 'Sign Up'}
      </Button>
    </PageWrapper>
  );
};
