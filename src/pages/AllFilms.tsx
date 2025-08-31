import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetUserItems } from "../hooks/queries/useGetUserItems";
import { useAuth } from "../hooks/useAuth";
import { MovieItem } from "../components/MovieItem";
import { useNavigate } from "react-router";
import { AllFilmsNotLoggedIn } from "./AllFilmsNotLoggedIn";
import { AddItemFormNew } from "../components/AddItemFormNew";
import { Add } from "@mui/icons-material";

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

  const goToMovie = (itemId: string, movieRefId: string) => {
    const path = "/movies/" + movieRefId + '/true';
    const q = `?ratedBy=${user?.id}&item_id=${itemId}&movie_ref_id=${movieRefId}`;
    nav(path + q);
  };
  const displayedItems = items.data?.map((i) => (
    <Box
      key={i.id}
      sx={{ mb: 2, cursor: "pointer" }}
      onClick={() => goToMovie(i.id, i.movie_ref_id)}
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
      <Typography>Films that you've seen, and haven't rated.</Typography>
      <Box sx={{ mt: 2, mb: 1, display: "flex", flexDirection: "row" }}>
        <Chip sx={{ mr: 1 }} label="List view" />
        <Chip sx={{ mr: 1 }} label="Not rated" />
        <Chip label="Grid view" />
        <Chip label="Watch list" />
      </Box>
      {displayedItems}
      {open && <AddItemFormNew fullScreen onClose={onClose} />}
    </Box>
  );
};
