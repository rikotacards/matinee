import { Box, Typography } from "@mui/material";
import React from "react";
import { type SearchResult as ISearchResult } from "../hooks/queries/useSearchMovies";
import { useNavigate } from "react-router";
import { TitleOption } from "../components/TitleOption";
interface SearchResultProps {
  onSearchResultClick?: () => void;

  searchResults: ISearchResult[];
}
export const SearchResult: React.FC<SearchResultProps> = ({
  searchResults,
}) => {
  const nav = useNavigate();

  if (searchResults === undefined || searchResults?.length === 0) {
    return <Typography>We couldn't find this movie</Typography>;
  }
  const go = (id: number) => {
    nav("/movies/" + id);
  };

  const displayedMovies = searchResults.map((m) => {
    return (
      <Box onClick={() => go(m.id)}>
        <TitleOption
          posterPath={m.poster_path}
          releaseDate={m.release_date}
          title={m.title}
        />
      </Box>
    );
  });
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
