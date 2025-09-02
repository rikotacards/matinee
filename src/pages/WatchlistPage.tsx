import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Add, MoreHoriz } from "@mui/icons-material";

import { WatchlistItems } from "./WatchlistItems";


export const WatchlistPage: React.FC = () => {
  const { user, loading } = useAuth();

  const [show, setShow] = React.useState(false);
  const onMore = () => {
    setShow(true);
  };
  const onClose = () => {
    setShow(false);
  };
  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        maxWidth: 500,
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <Typography fontWeight="bold" variant="h4">
          Watchlist
        </Typography>

        <IconButton sx={{ ml: "auto" }}>
          <Add />
        </IconButton>
        <IconButton onClick={show ? () => onClose() : () => onMore()}>
          <MoreHoriz />
        </IconButton>
      </Stack>

      <WatchlistItems userId={user.id} show={show} />
    </Box>
  );
};
