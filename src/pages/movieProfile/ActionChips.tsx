import {
  Add,
  CheckCircle,
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
  onOpenDialog: (dialogName: string) => void;
  movieId: string;
  isInternal: boolean;
}
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useAddToWatchlist } from "../../hooks/mutations/useAddToWatchlist";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useGetWatchlistItemByMovieRefId } from "../../hooks/queries/useGetWatchlistItemByItemId";
import { useAuth } from "../../hooks/useAuth";
export const ActionChips: React.FC<ActionChipsProps> = ({
  myRating,
  hasWatched,
  onUpdate,
  onOpenDialog,
  movieId, 
  isInternal
}) => {
  const {user} = useAuth();
  const addToWatchlist = useAddToWatchlist(movieId, isInternal)
  const watchlistData = useGetWatchlistItemByMovieRefId({userId: user?.id, movie_ref_id: movieId})
  const isInWatchList = watchlistData.data
  const watchlistIcon = isInWatchList ? <BookmarkAddedIcon/> : <BookmarkBorderIcon/>
  const watchedLabel = (
    <Typography  variant="caption">
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
        sx={{ mr: 1 }}
        onClick={() => onUpdate(hasWatched ? "not watched" : "watched")}
        label={watchedLabel}
      />
      { (
        <Chip
          icon={ratingIcon}
          // variant="outlined"
          sx={{ mr: 1 }}
          onClick={() => onOpenDialog('edit')}
          label={
            <Typography variant="caption">
              {myRating ? `${myRating}/5` : "Rate"}
            </Typography>
          }
        />
      )}
      <Chip
        icon={watchlistIcon}
        // variant="outlined"
        sx={{ mr: 1 }}
        onClick={() => addToWatchlist()}
        label={<Typography variant="caption">watchlist</Typography>}
      />
      <Chip
        icon={<Add fontSize="small" />}
        // variant="outlined"
        sx={{ mr: 1 }}
        onClick={() => onOpenDialog('addToList')}
        label={<Typography variant="caption">List</Typography>}
      />
    </Box>
  );
};
