import { MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
interface WatchedByProps {
  hasWatched: boolean;
}
export const WatchedBy: React.FC<WatchedByProps> = ({ hasWatched }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Avatar sx={{ mr: 0.5, height: 20, width: 20 }} />
      <Typography variant="body2" sx={{mr:'auto'}}>
        Watched by{hasWatched ? <b> you,</b> : null} <b>Hala</b> and{" "}
        <b>others</b>
      </Typography>
    
        <MoreHoriz fontSize="small" />
    </Box>
  );
};
