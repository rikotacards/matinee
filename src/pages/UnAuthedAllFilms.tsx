import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useSignIn } from "../hooks/useSignIn";
import { PageWrapper } from "../layouts/PageWrapper";
import React from "react";

export const UnAuthedAllFilms: React.FC = () => {
  const signIn = useSignIn();
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    setLoading(true);
    await signIn.mutateAsync();
  };

  return (
    <PageWrapper>
      <Typography sx={{ mb: 2 }} variant={"h3"} fontWeight={"bold"}>
        Track films you've watched. Save those you want to see. Tell your
        friends whats good.
      </Typography>
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          bottom: "0",
        }}
      >
        <Button onClick={onClick} fullWidth variant="contained" color="success">
          {loading ? <CircularProgress size={20} /> : "Get started"}
        </Button>
      </Box>
    </PageWrapper>
  );
};
