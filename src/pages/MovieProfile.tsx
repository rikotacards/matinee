import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useGetMovieRef } from "../hooks/queries/useGetMovieRef";
import { getImage } from "../utils/getImage";
import { useGetExternalMovieDetailsById } from "../hooks/queries/useGetMovieById";
import { useDialogControl } from "../hooks/useDialogControl";
import { DialogWrapper } from "../components/DialogWrapper";
import { AddToListPage } from "./AddToListPage";
import { useGetRating } from "../hooks/queries/useGetRating";
import { useAuth } from "../hooks/useAuth";
import { RatingDisplay } from "../components/RatingDisplay";
import { useGetUserItemById } from "../hooks/queries/useGetUserItemById";

export const MovieProfile: React.FC = () => {
  const [q] = useSearchParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const item_id = q.get("item_id");
  const item = useGetUserItemById({ userId: user?.id, id: item_id });
  const hasWatched = item.data?.status === "watched";
  const movie_ref_id = q.get("movie_ref_id");

  const { name, onCloseDialog, setDialogName } = useDialogControl();
  const movie_ref = useGetMovieRef(movie_ref_id || "");
  const externalDetails = useGetExternalMovieDetailsById(
    movie_ref.data?.external_id
  );
  const poster_path = getImage(movie_ref?.data?.poster_path);

  const [searchParams] = useSearchParams();

  const ratedBy = searchParams.get("ratedBy");
  const yourRating = useGetRating({
    user_id: user?.id || "",
    movie_ref_id: movie_ref_id || "",
  });
  if (!item_id) {
    return <Typography>Invalid page</Typography>;
  }
  if (movie_ref?.isLoading || externalDetails.isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={() => nav(-1)}>
          <ArrowBackIosNew />
        </IconButton>
        <Typography fontWeight={"bold"} variant="body2">
          Back
        </Typography>
      </Box>
      <Box>
        <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "center" }}>
          <Avatar sx={{ mr: 2, height: 120, width: 120 }} src={poster_path} />
          <Stack direction="column">
            <Typography sx={{ mb: 1 }} fontWeight={"bold"} variant="h5">
              {movie_ref.data?.title}
            </Typography>
            <Stack>
              <Typography color="textSecondary">Your rating</Typography>
              <RatingDisplay rating={yourRating.data?.rating} />
            </Stack>
            {/* <Typography variant="body2" color="textSecondary">
              Release
            </Typography>
            <Typography>
              {movie_ref.data?.release
                ? new Date(movie_ref.data.release).toDateString()
                : null}
            </Typography> */}
          </Stack>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Stack>
            <Typography color="textSecondary">Your rating</Typography>
            <RatingDisplay rating={yourRating.data?.rating} />
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", whiteSpace: "wrap", flexDirection: "column" }}
      >
        <Typography color="textSecondary">Overview</Typography>
        <Typography>{externalDetails.data?.overview}</Typography>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box>
        <Button>Save to collection</Button>
        <Button>Add to watch list</Button>
        <Button>Add review</Button>
        <Button onClick={() => setDialogName("addToList")}>Add to list</Button>
      </Box>
      <DialogWrapper
        title={"add"}
        open={name === "addToList"}
        onClose={onCloseDialog}
      >
        <AddToListPage itemId={item_id} />
      </DialogWrapper>
    </Box>
  );
};
