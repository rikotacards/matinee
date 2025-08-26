import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import type { Movie } from "../hooks/queries/useGetMovieById";
import { TitleOption } from "./TitleOption";
interface DetailsInputFormProps {
  movie: Movie;
  rating: number;
  onRatingChange: (r: number) => void;
  onWatchedDateChange: (d: string) => void;
  watchedDate: string | null;
  setWatched: (h: boolean) => void;
  hasWatched: boolean;
}
const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
export const DetailsInputForm: React.FC<DetailsInputFormProps> = ({
  movie,
  rating,
  watchedDate,
  setWatched,
  hasWatched,
  onRatingChange,
  onWatchedDateChange,
}) => {
  return (
    <Box sx={{ p: 2 }}>
      <TitleOption
        title={movie.title}
        posterPath={movie.poster_path}
        releaseDate={movie.release_date}
      />

      <Box
        sx={{
          mt:2,
          mb: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          disableElevation
          sx={{ mr: 1 }}
          fullWidth
          onClick={() => setWatched(true)}
          variant={hasWatched ? "contained" : "outlined"}
        >
          Already Watched
        </Button>
        <Button
          onClick={() => setWatched(false)}
          variant={!hasWatched ? "contained" : "outlined"}
          fullWidth
        >
          Want to watch
        </Button>
      </Box>
      <TextField
        value={watchedDate}
        onChange={(e) => onWatchedDateChange(e.target.value)}
        placeholder="Date watched"
        fullWidth
      />
      <Typography color="textSecondary" variant="caption">
        Leave blank to fill out later
      </Typography>
      <Typography sx={{ mt: 2 }}>Your rating (out of 5)</Typography>
      <Box
        sx={{
          display: "flex",
          pt: 1,
          pb: 1,
          overflow: "hidden",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {ratings.map((r) => (
          <Box
            onClick={() => onRatingChange(r)}
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
            }}
          >
            <IconButton sx={{ display: "flex", p: 0 }}>
              <Typography
                color={rating === r ? "warning" : undefined}
                variant="caption"
              >
                {r}
              </Typography>
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
