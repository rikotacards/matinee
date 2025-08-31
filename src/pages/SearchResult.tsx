import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSearchMovies } from "../hooks/queries/useSearchMovies";
import { useNavigate } from "react-router";
import { TitleOption } from "../components/TitleOption";
interface SearchResultProps {
  movieName?: string;
}
export const SearchResult: React.FC<SearchResultProps> = ({ movieName }) => {
  const { data: searchResults, isLoading } = useSearchMovies(movieName);
  const nav = useNavigate();
  if (isLoading) {
    return <CircularProgress sx={{ alignSelf: "center", m: 2 }} />;
  }

  if (searchResults === undefined || searchResults?.length === 0) {
    return <Typography>We couldn't find this movie</Typography>;
  }
  const go = (id: number) => {
    nav("/movies/" + id + '/false');
  };
  console.log("s", searchResults);
  const displayedMovies = searchResults.map((m) => (
    <Box onClick={() => go(m.id)}>
      <TitleOption
        posterPath={m.poster_path}
        releaseDate={m.release_date}
        title={m.title}
      />
    </Box>
  ));
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        height: "100%",
      }}
    >
      {displayedMovies}
    </Box>
  );
};
