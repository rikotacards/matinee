import { Avatar, Box, Button, Chip, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import type { UserItem } from "../../hooks/queries/useGetUserItems";
interface MovieProfileHeaderProps {
  poster_path?: string;
  title: string;
  release: string;
  item?: UserItem;
  onUpdate: (arg: string) => Promise<void>;
  userId?: number;
  movieId: number;
}
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
import { useGetRating } from "../../hooks/queries/useGetRating";

export const MovieProfileHeader: React.FC<MovieProfileHeaderProps> = ({
  poster_path,
  title,
  release,
  onUpdate,
  item,
  userId,
  movieId,
}) => {
  const hasWatched = item?.status === "watched";
    const { setDialogName, onCloseDialog, name } = useDialogControl();
    const myRating = useGetRating({
      user_id: userId ,
      movie_ref_id: movieId
    });
    if(!movieId){
      return <Typography>Cant find the movie</Typography>
    }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Avatar sx={{ mr: 2, height: 180, width: 180 }} src={poster_path} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ m: 1 }} fontWeight={"bold"} variant="h6">
            {title}
          </Typography>
          <Typography sx={{ ml: 1 }} variant="caption" color="textSecondary">
            Release date
          </Typography>
          <Typography sx={{ ml: 1 }} variant="caption">
            {release ? new Date(release).toDateString() : null}
          </Typography>
        </Box>
      </Box>
      {item?.status !== null && (
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
            onDelete={() => onUpdate(hasWatched ? "not watched" : "watched")}
            label={hasWatched ? "Watched" : "Not watched"}
          />
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        {item?.status === undefined && (
          <Typography sx={{ mb: 1 }} color="textSecondary">
            Have you seen this?
          </Typography>
        )}

        <Divider />
        {item?.status === undefined && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Button
              onClick={() => onUpdate("watched")}
              sx={{ mr: 0.5 }}
              variant="contained"
              fullWidth
              color="success"
            >
              Yes
            </Button>
            <Button
              onClick={() => onUpdate("not watched")}
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
            item?.status === "watched" && (
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
                p: 1,
              }}
            >
              <RatingInputForm
                movie_ref_id={movieId}
                onClose={onCloseDialog}
              />
              <Button onClick={onCloseDialog} fullWidth>
                Cancel
              </Button>
            </Box>
          )}
      </Box>
    </Box>
  );
};
