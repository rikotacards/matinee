import {
  AppBar,
  Box,
  Card,
  Chip,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetUserItems } from "../hooks/queries/useGetUserItems";
import { useAuth } from "../hooks/useAuth";
import { MovieItem } from "../components/MovieItem";
import { useNavigate } from "react-router";
import { AllFilmsNotLoggedIn } from "./AllFilmsNotLoggedIn";
import { AddItemFormNew } from "../components/AddItemFormNew";
import { Add, Close } from "@mui/icons-material";
import { SearchPage } from "./SearchPage";

export const AllFilms: React.FC = () => {
  const { session, user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const items = useGetUserItems(user?.id);
  const nav = useNavigate();
  if (items.isLoading) {
    return <CircularProgress />;
  }

  const goToMovie = (movieRefId: string) => {
    const path = "/movies/" + movieRefId + "/true";
    const q = `?ratedBy=${user?.id}`;
    nav(path + q);
  };
  const displayedItems = items.data?.map((i) => (
    <Box
      key={i.id}
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => goToMovie(i.movie_ref_id)}
    >
      <MovieItem item={i} />
    </Box>
  ));
  if (!session) {
    return <AllFilmsNotLoggedIn />;
  }
  if (!items.data?.length) {
    return <Typography>You have not added any films</Typography>;
  }
  return (
    <Box>
      <Stack direction="row" alignItems={"center"}>
        <Typography fontWeight={"bold"} variant="h4">
          Your Films
        </Typography>
        <IconButton sx={{ ml: "auto" }} onClick={onOpen}>
          <Add />
        </IconButton>
      </Stack>
      <Typography>Films that you've <b>watched</b>, and or rated.</Typography>
      <Box sx={{ mt: 2, mb: 1, display: "flex", flexDirection: "row" }}>
        <Chip sx={{ mr: 1 }} label="List view" />
        <Chip sx={{ mr: 1 }} label="Not rated" />
        <Chip sx={{ mr: 1 }} label="Grid view" />
        <Chip label="Watch list" />
      </Box>
      {displayedItems}
      {/* {open && <AddItemFormNew fullScreen onClose={onClose} />} */}
      <Dialog fullScreen open={open} onClose={onClose}>
        <AppBar variant='outlined' position="relative">
          <Toolbar><Typography sx={{mr: 'auto'}}>Search</Typography><IconButton sx={{mr:1}} onClick={onClose}><Close/></IconButton></Toolbar>
        </AppBar>
        <Box sx={{height:'100%'}} elevation={0} component={Card}>

        <SearchPage/>
        </Box>
      </Dialog>
    </Box>
  );
};
