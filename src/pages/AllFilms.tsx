import {
  AppBar,
  Box,
  Card,
  Chip,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { AllFilmsNotLoggedIn } from "./AllFilmsNotLoggedIn";
import { Add, Close } from "@mui/icons-material";
import { SearchPage } from "./SearchPage";
import { AllFilmsItems } from "./AllFilmsItems";
import { PageWrapper } from "../layouts/PageWrapper";

export const AllFilms: React.FC = () => {
  const { session, user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (!session || !user) {
    return <AllFilmsNotLoggedIn />;
  }

  return (
    <Box sx={{ maxWidth: 500 }}>
      <PageWrapper
        desc={
          <Typography>
            Films that you've <b>watched</b>, and or rated.
          </Typography>
        }
        buttons={
          <>
            <IconButton sx={{ ml: "auto" }} onClick={onOpen}>
              <Add />
            </IconButton>
          </>
        }
        pageName="Your films"
      >
        <Box sx={{ mt: 1, mb: 2, display: "flex", flexDirection: "row" }}>
          <Chip sx={{ mr: 1 }} label="All" />
          <Chip sx={{ mr: 1 }} label="Not rated" />
          <Chip label="Watchlist" />
        </Box>
        <AllFilmsItems userId={user.id} />
      </PageWrapper>

      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar variant="outlined" position="relative">
          <Toolbar>
            <Typography sx={{ mr: "auto" }}>Search</Typography>
            <IconButton sx={{ mr: 1 }} onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%" }} elevation={0} component={Card}>
          <SearchPage />
        </Box>
      </Dialog>
    </Box>
  );
};
