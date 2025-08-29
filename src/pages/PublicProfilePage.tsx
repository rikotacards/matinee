import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { signOut } from "../userActions/signOut";

export const PublicProfilePage: React.FC = () => {
  return (
    <Box>
      <Typography>Profile coming soon</Typography>
      <Button onClick={() => signOut()} sx={{ mt: 2 }} variant="outlined" fullWidth color="error">
        Sign out
      </Button>
    </Box>
  );
};
