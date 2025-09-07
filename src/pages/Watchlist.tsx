import {
  AppBar,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Add, Close, MoreHoriz } from "@mui/icons-material";

import { WatchlistItems } from "./WatchlistItems";
import { useDialogControl } from "../hooks/useDialogControl";
import { SearchPage } from "./SearchPage";
import { PageWrapper } from "../layouts/PageWrapper";

export const Watchlist: React.FC = () => {
  const { user, loading } = useAuth();
  const { name, setDialogName, onCloseDialog } = useDialogControl();
  const onMore = () => {
    setDialogName("more");
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (!user) {
    return null;
  }

  return (
    <PageWrapper
      pageName="watchlist"
      buttons={
        <>
          {name == "more" ? null : (
            <IconButton
              onClick={() => setDialogName("add")}
              sx={{ ml: "auto" }}
            >
              <Add />
            </IconButton>
          )}
          {name === "more" ? (
            <Button onClick={() => onCloseDialog()} size="small">
              Done
            </Button>
          ) : (
            <IconButton onClick={() => onMore()}>
              <MoreHoriz />
            </IconButton>
          )}
        </>
      }
    >
      <WatchlistItems userId={user.id} show={name === "more"} />

      <Dialog fullScreen open={name === "add"} onClose={onCloseDialog}>
        <AppBar variant="outlined" position="relative">
          <Toolbar>
            <Typography sx={{ mr: "auto" }}>Search</Typography>
            <IconButton sx={{ mr: 1 }} onClick={onCloseDialog}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%" }} elevation={0} component={Card}>
          <SearchPage onClose={onCloseDialog} prevPage="watchlist" />
        </Box>
      </Dialog>
    </PageWrapper>
  );
};
