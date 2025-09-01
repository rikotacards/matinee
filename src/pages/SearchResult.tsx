import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSearchMovies, type SearchResult as ISearchResult } from "../hooks/queries/useSearchMovies";
import { useNavigate } from "react-router";
import { TitleOption } from "../components/TitleOption";
import { AddToListItemWrapper } from "../components/AddToListItemWrapper";
interface SearchResultProps {
  enableAddToList?: boolean;
  onSearchResultClick?: () => void;
  listId?: string | number;
  onClose?: () => void;
  searchResults: ISearchResult[];
}
export const SearchResult: React.FC<SearchResultProps> = ({
  enableAddToList,
  listId,
  onClose,
  searchResults
}) => {
  const nav = useNavigate();
  

  if (searchResults === undefined || searchResults?.length === 0) {
    return <Typography>We couldn't find this movie</Typography>;
  }
  const go = (id: number) => {
    nav("/movies/" + id + "/false");
  };

  const displayedMovies = searchResults.map((m) => {
    if (enableAddToList) {
      return (
        <AddToListItemWrapper
          movieId={m.id}
          isInternal={false}
          listId={listId}
          onClose={() => {
            onClose?.();
          }}
        >
          <TitleOption
            posterPath={m.poster_path}
            releaseDate={m.release_date}
            title={m.title}
          />

        </AddToListItemWrapper>
      );
    } else
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
