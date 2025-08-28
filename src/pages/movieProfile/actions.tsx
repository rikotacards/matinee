import { Add } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import React from "react";
interface IconLayoutProps {
  children: React.ReactNode;
  label: string;
}
export const IconLayout: React.FC<IconLayoutProps> = ({ children, label }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        mr:1
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <IconButton>{children}</IconButton>
      </Box>
      <Typography sx={{textAlign: 'center'}} variant="caption">{label}</Typography>
    </Box>
  );
};
export const Actions: React.FC = () => {
  return (
    <Stack direction="row" alignItems="center">
      <IconLayout label="List">
        <PlaylistAddIcon />
      </IconLayout>
       <IconLayout label="Watchlist">
        <VisibilityIcon />
      </IconLayout>
       <IconLayout label="Share">
        <SendIcon />
      </IconLayout>
    </Stack>
  );
};
