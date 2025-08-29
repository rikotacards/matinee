import { Box, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { MyWatchlist } from "./MyWatchlist";
import { Add, MoreHoriz } from "@mui/icons-material";

export const MyWatchlistPage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }
  return (
    <Box sx={{display: 'flex',flexDirection: 'column', minWidth:300, maxWidth:500}}>
      <Stack direction={'row'} alignItems={'center'}>
        <Typography fontWeight="bold" variant="h4">
          Watchlist
        </Typography>
      
        <IconButton sx={{ml:'auto'}}>
            <Add/>
        </IconButton>
        <IconButton>
            <MoreHoriz/>
        </IconButton>
      </Stack>
      <MyWatchlist myUserId={user.id} />
    </Box>
  );
};
