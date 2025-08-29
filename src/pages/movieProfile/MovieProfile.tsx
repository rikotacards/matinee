import { ArrowBackIosNew, Close } from "@mui/icons-material";
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
import { useGetUserItemById } from "../../hooks/queries/useGetUserItemById";
import { Actions } from "./actions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useUpdateUserItem,
  type UpdateUserItem,
} from "../../hooks/mutations/useUpdateUserItem";
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
const imageProfileSize = 180;
import { RatingInputForm } from "../../components/RatingInputForm";
import { AllRatings } from "./AllRatings";
import LinkIcon from "@mui/icons-material/Link";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { useUpsertWatchlistItem } from "../../hooks/mutations/useUpsertWatchlistItem";
import { useGetWatchlistItemByMovieRefId } from "../../hooks/queries/useGetWatchlistItemByItemId";
import { useDeleteWatchlistItem } from "../../hooks/mutations/useDeleteWatchlistItem";
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
  const upsertWatchlist = useUpsertWatchlistItem();
  const {data: isInWatchlist} = useGetWatchlistItemByMovieRefId({
    userId: user?.id,
    movie_ref_id: myItem.data?.movie_ref_id,
  });
  console.log('hi', isInWatchlist)
  const deleteWatchlistItem = useDeleteWatchlistItem();
  const movie_ref = useGetMovieRef(movie_ref_id_url || "");
  const externalDetails = useGetExternalMovieDetailsById(
    movie_ref.data?.external_id
  );
  const onAddWatchList = () => {
    if (!myItem.data?.movie_ref_id || !user?.id) {
      return;
    }
    upsertWatchlist.mutateAsync({
      movie_ref_id: myItem.data?.movie_ref_id,
      user_id: user.id,
      item_id: myItem.data.id
    });
  };
  const onDeleteWatchlistItem = () => {
     if (!myItem.data?.movie_ref_id || !user?.id) {
      return;
    }
    deleteWatchlistItem.mutate({
      user_id: user?.id,
      movie_ref_id: myItem.data?.movie_ref_id,
    });
  };
  const poster_path = getImage(movie_ref?.data?.poster_path);

  const [searchParams] = useSearchParams();

  const ratedBy = searchParams.get("ratedBy");
  const actionButtons = [
    {
      label: "Add to List",
      icon: <PlaylistAddIcon />,
      onClick: () => setDialogName("addToList"),
    },
    {
      label: isInWatchlist ? "Remove from watchlist" : "Add to Watchlist",
      icon: isInWatchlist ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />,
      onClick: isInWatchlist ? onDeleteWatchlistItem : onAddWatchList,
    },
    {
      label: "Share",
      icon: <LinkIcon />,
      onClick: () => {},
    },
  ];
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
        <Box sx={{ mt: 2, mb: 2, display: "flex", alignItems: "flex-start" }}>
          <Avatar
            sx={{ mr: 2, height: imageProfileSize, width: imageProfileSize }}
            src={poster_path}
          />
          <Stack direction="column">
            <Typography sx={{ m: 1 }} fontWeight={"bold"} variant="h6">
              {movie_ref.data?.title}
            </Typography>

            <Typography sx={{ ml: 1 }} variant="caption" color="textSecondary">
              Release date
            </Typography>
            <Typography sx={{ ml: 1 }} variant="caption">
              {movie_ref.data?.release
                ? new Date(movie_ref.data.release).toDateString()
                : null}
            </Typography>
            {myItem.data?.status !== null && (
              <Box sx={{ mt: 3, mb: 2, flexDirection: "column" }}>
                <Chip
                  icon={
                    !hasWatched ? (
                      <RadioButtonUncheckedIcon color="error" />
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
            )}
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          {myItem.data?.status === null && (
            <Typography sx={{ mb: 1 }} color="textSecondary">
              Have you seen this?
            </Typography>
          )}

          <Divider />
          {myItem.data?.status === null && (
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <Button
                onClick={() =>
                  onUpdate({
                    itemId: item_id,
                    updatePayload: { status: "watched" },
                  })
                }
                sx={{ mr: 0.5 }}
                variant="contained"
                fullWidth
                color="success"
              >
                Yes
              </Button>
              <Button
                onClick={() =>
                  onUpdate({
                    itemId: item_id,
                    updatePayload: { status: "not watched" },
                  })
                }
                sx={{ ml: 0.5 }}
                variant="outlined"
                fullWidth
              >
                Not yet
              </Button>
            </Box>
          )}
          {name !== "addRating" &&
            !myRating.data &&
            myItem.data?.status === "watched" && (
              <Button
                onClick={() => setDialogName("addRating")}
                fullWidth
                variant="contained"
              >
                Add Rating
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
                p:1
              }}
            >
        
              <RatingInputForm
                movie_ref_id={Number(movie_ref_id_url)}
                onClose={onCloseDialog}
              />
              <Button onClick={onCloseDialog} fullWidth >Cancel</Button>
            </Box>
          )}
          {myItem?.data?.status === "not watched" && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                onClick={() =>
                  onUpdate({
                    itemId: item_id,
                    updatePayload: {
                      status: "watchlist",
                    },
                  })
                }
                variant="contained"
                fullWidth
                sx={{ mb: 1 }}
              >
                Add to watchlist
              </Button>
              <Button
                onClick={() =>
                  onUpdate({
                    itemId: item_id,
                    updatePayload: {
                      status: "later",
                    },
                  })
                }
                fullWidth
              >
                Later
              </Button>
            </Box>
          )}

          <Typography
            color="textSecondary"
            sx={{ mt: 2, mb: 0 }}
            variant="body1"
          >
            Ratings
          </Typography>
          <AllRatings ratedBy={ratedBy} movie_ref_id_url={movie_ref_id_url} />
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        <Actions actions={actionButtons} />
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Box>
      <Box
        sx={{ display: "flex", whiteSpace: "wrap", flexDirection: "column" }}
      >
        <Typography color="textSecondary">Overview</Typography>
        <Typography>{externalDetails.data?.overview}</Typography>
      </Box>

      <DialogWrapper
        title={"add"}
        open={name === "addToList"}
        onClose={onCloseDialog}
      >
        <AddToListPage onClose={onCloseDialog} itemId={item_id} />
      </DialogWrapper>
    </Box>
  );
};
