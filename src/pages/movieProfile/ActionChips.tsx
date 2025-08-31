import {
  Add,
  Check,
  CheckCircle,
  Close,
  CloseRounded,
  MoreHoriz,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
interface ActionChipsProps {
  hasWatched: boolean;
  onUpdate: (arg: string) => Promise<void>;
  myRating?: number;
}
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
export const ActionChips: React.FC<ActionChipsProps> = ({
  myRating,
  hasWatched,
  onUpdate,
}) => {
  const watchedLabel = (
    <Typography variant="caption">
      {hasWatched ? "Watched" : "Not watched"}
    </Typography>
  );
  const watchedIcon = !hasWatched ? (
    <CloseRounded fontSize="small" color="error" />
  ) : (
    <CheckCircle fontSize="small" color="success" />
  );
  const ratingIcon = myRating ? (
    <Star fontSize="small" color="warning" />
  ) : (
    <StarOutline fontSize="small" />
  );
  return (
    <Box sx={{ mt: 1 }}>
      <Chip
        icon={watchedIcon}
        variant="outlined"
        sx={{ mr: 1 }}
        onClick={() => onUpdate(hasWatched ? "not watched" : "watched")}
        label={watchedLabel}
      />
      {hasWatched && (
        <Chip
          icon={ratingIcon}
          variant="outlined"
          sx={{ mr: 1 }}
          label={
            <Typography variant="caption">
              {myRating ? `${myRating}/5` : "Add rating"}
            </Typography>
          }
        />
      )}
      <Chip
        icon={<BookmarkBorderIcon fontSize="small" />}
        variant="outlined"
        sx={{ mr: 1 }}
        label={<Typography variant="caption">watchlist</Typography>}
      />
      <Chip
        icon={<Add fontSize="small" />}
        variant="outlined"
        sx={{ mr: 1 }}
        label={<Typography variant="caption">List</Typography>}
      />
      <IconButton>
        <MoreHoriz />
      </IconButton>
    </Box>
  );
};
