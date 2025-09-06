import { Box, Typography } from "@mui/material";
import React from "react";
import { type SearchResult as ISearchResult } from "../hooks/queries/useSearchMovies";
import { TitleOption } from "../components/TitleOption";
import { AddToWatchlistItemWrapper } from "../components/AddToWatchlistItemWrapper";
interface SearchResultProps {
  onSearchResultClick?: () => void;
  onClose?: () => void;
  searchResults: ISearchResult[];
}
export const SearchResultWatchlist: React.FC<SearchResultProps> = ({
  onClose,
  searchResults,
}) => {
  if (searchResults === undefined || searchResults?.length === 0) {
    return <Typography>We couldn't find this movie</Typography>;
  }

  const displayedMovies = searchResults.map((m) => {
    return (
      <AddToWatchlistItemWrapper
        movieId={m.id}
        isInternal={false}
        onClose={() => {
          onClose?.();
        }}
      >
        <TitleOption
          posterPath={m.poster_path}
          releaseDate={m.release_date}
          title={m.title}
        />
      </AddToWatchlistItemWrapper>
    );
  });
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        height: "100%",
        width:'100%',
        overflowY: 'scroll',
      }}
    >
      {displayedMovies}
    </Box>
  );
};
