import { Box, Chip, Typography } from "@mui/material";
import React from "react";

export const SearchButton: React.FC = () => {
  return (
    <Box
      sx={{
        p: 1,
        width: '100%',
        maxWidth: 500,
        display: "flex",
        border: "1px solid",
        borderColor: "orange",
        alignItems: "center",
        borderRadius: "30px",
      }}
    >
      <Typography color='textSecondary' sx={{ ml: 1 }}>Search movie</Typography>
      <Chip sx={{ ml: "auto" }} label="Search" />
    </Box>
  );
};
