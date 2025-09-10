import { Button, CircularProgress, Typography } from "@mui/material";
import { PageWrapper } from "../layouts/PageWrapper";
import React from "react";
import { useSignIn } from "../hooks/useSignIn";

export const UnAuthedWatchlist: React.FC = () => {
  const signIn = useSignIn();

  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    setLoading(true);
    await signIn.mutateAsync();
  };
  return (
    <PageWrapper pageName="watchlist">
      <Typography fontWeight={"bold"} variant="h3">
        Save movies to your watchlist to watch later
      </Typography>
      <Button
        onClick={onClick}
        sx={{ mt: 2 }}
        fullWidth
        color="success"
        variant="contained"
      >
        {loading ? <CircularProgress size={20} /> : "Sign Up"}
      </Button>
    </PageWrapper>
  );
};
