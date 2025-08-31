import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";
import React from "react";
import type { UserItem } from "../../hooks/queries/useGetUserItems";
interface MovieProfileHeaderProps {
  poster_path?: string;
  title: string;
  release: string;
  item?: UserItem;
  onUpdate: (arg: string) => Promise<void>;
  userId?: string;
  movieId: number;
  overview?: string;
}
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
import { useGetRating } from "../../hooks/queries/useGetRating";
import { WatchedBy } from "./WatchedBy";
import { Add, Close, List, Star, StartRounded } from "@mui/icons-material";

export const MovieProfileHeader: React.FC<MovieProfileHeaderProps> = ({
  poster_path,
  title,
  release,
  onUpdate,
  item,
  userId,
  overview,
  movieId,
}) => {
  const hasWatched = item?.status === "watched";
  const { setDialogName, onCloseDialog, name } = useDialogControl();
  console.log("movie", movieId, userId);
  const myRating = useGetRating({
    user_id: userId,
    movie_ref_id: movieId,
  });
  if (!movieId) {
    return <Typography>Cant find the movie</Typography>;
  }
  const chipIcon = !hasWatched ? (
    <RadioButtonUncheckedIcon color="error" />
  ) : (
    <CheckCircleIcon color="success" />
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar sx={{ mr: 2, height: 150, width: 150 }} src={poster_path} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ mt: 1 }} fontWeight={"bold"} variant="h6">
            {title}
          </Typography>
          <Typography color="textSecondary" variant="caption">
            {release ? new Date(release).toDateString() : null}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
