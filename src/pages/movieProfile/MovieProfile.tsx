import { ArrowBackIosNew, Close, MoreHoriz } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useGetMovieRef } from "../../hooks/queries/useGetMovieRef";
import { getImage } from "../../utils/getImage";
import { useGetExternalMovieDetailsById } from "../../hooks/queries/useGetMovieById";
import { useDialogControl } from "../../hooks/useDialogControl";
import { DialogWrapper } from "../../components/DialogWrapper";
import { AddToListPage } from "../AddToListPage";
import { useGetRating } from "../../hooks/queries/useGetRating";
import { useAuth } from "../../hooks/useAuth";
import { RatingDisplay } from "../../components/RatingDisplay";
import { useGetUserItemById } from "../../hooks/queries/useGetUserItemById";
import { Actions } from "./actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useUpdateUserItem,
  type UpdateUserItem,
} from "../../hooks/mutations/useUpdateUserItem";
import { RatingRow } from "./RatingRow";
import { RatingInputForm } from "../../components/RatingInputForm";
export const MovieProfile: React.FC = () => {
  const [q] = useSearchParams();
  const params = useParams();
  const movie_ref_id_url = params.movie_ref_id;
  const { user } = useAuth();
  const update = useUpdateUserItem();
  const onUpdate = (arg: UpdateUserItem) => {
    update.mutate(arg);
  };
  const nav = useNavigate();
  const item_id = q.get("item_id");
  const myItem = useGetUserItemById({ userId: user?.id, id: item_id });
  const { setDialogName, onCloseDialog, name } = useDialogControl();
  const hasWatched = myItem.data?.status === "watched";

  const movie_ref = useGetMovieRef(movie_ref_id_url || "");
  const externalDetails = useGetExternalMovieDetailsById(
    movie_ref.data?.external_id
  );
  const poster_path = getImage(movie_ref?.data?.poster_path);

  const [searchParams] = useSearchParams();

  const ratedBy = searchParams.get("ratedBy");
  const otherPersonRating = useGetRating({
    user_id: ratedBy,
    movie_ref_id: movie_ref_id_url || "",
  });
  const myRating = useGetRating({
    user_id: user?.id || "",
    movie_ref_id: movie_ref_id_url || "",
  });
  if (!movie_ref_id_url) {
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
        <Typography sx={{ ml: 1 }} fontWeight={"bold"} variant="body2">
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

            <Typography variant="body2" color="textSecondary">
              Release
            </Typography>
            <Typography variant="body2">
              {movie_ref.data?.release
                ? new Date(movie_ref.data.release).toDateString()
                : null}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 2, flexDirection: "column" }}>
            <Chip
              size="small"
              icon={
                !hasWatched ? (
                  <RadioButtonUncheckedIcon />
                ) : (
                  <CheckCircleIcon color="success" />
                )
              }
              deleteIcon={<KeyboardArrowDownIcon />}
              onDelete={() =>
                onUpdate({
                  itemId: item_id,
                  updatePayload: {
                    status: hasWatched ? "not watched" : "watched",
                  },
                })
              }
              label={hasWatched ? "Watched" : "Not watched"}
            />
          </Box>
          <Typography color="textSecondary" sx={{ mb: 1 }} variant="body1">
            Ratings
          </Typography>
          {ratedBy !== user?.id && otherPersonRating && (
            <RatingRow rating={otherPersonRating.data?.rating || 0} />
          )}
          <RatingRow rating={myRating.data?.rating || 0} />
        </Box>
        {!myRating.data && name !== "addRating" && (
          <Button
            onClick={() => setDialogName("addRating")}
            fullWidth
            variant="outlined"
          >
            Add your rating
          </Button>
        )}
        {name === "addRating" && (
          <Box
            component={Paper}
            variant="outlined"
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton onClick={onCloseDialog} sx={{ m: 1, ml: "auto" }}>
              <Close />
            </IconButton>
            <RatingInputForm
              movie_ref_id={Number(movie_ref_id_url)}
              onClose={onCloseDialog}
            />
          </Box>
        )}
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Actions />
        <Divider sx={{ mt: 2, mb: 2 }} />
      </Box>
      <Box
        sx={{ display: "flex", whiteSpace: "wrap", flexDirection: "column" }}
      >
        <Typography color="textSecondary">Overview</Typography>
        <Typography>{externalDetails.data?.overview}</Typography>
      </Box>

      <Divider sx={{ mt: 2, mb: 2 }} />
      <Box>
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
