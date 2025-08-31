import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
interface WatchedByProps {
  hasWatched?: boolean;
}
export const WatchedWith: React.FC<WatchedByProps> = ({ hasWatched }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ mr: 0.5, height: 20, width: 20 }} />
      <Typography variant="body2">
        Watched with{hasWatched ? <b> you,</b> : null} <b>Hala</b> and{" "}
        <b>others</b>
      </Typography>
      <Box sx={{ ml: "auto" }}>
        <Typography variant="caption">Have you watched this?</Typography>
      </Box>
      <IconButton size="small" sx={{  }}>
        <MoreHoriz fontSize="small" />
      </IconButton>
    </Box>
  );
};
