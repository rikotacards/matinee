import { Box, Typography } from "@mui/material";
import React from "react";
import { type SearchResult as ISearchResult } from "../hooks/queries/useSearchMovies";
import { TitleOption } from "../components/TitleOption";
import { AddToListItemWrapper } from "../components/AddToListItemWrapper";
interface SearchResultProps {
  listId: string | number;
  onClose?: () => void;
  searchResults: ISearchResult[];
}
export const SearchResultList: React.FC<SearchResultProps> = ({
  listId,
  onClose,
  searchResults,
}) => {

  if (searchResults === undefined || searchResults?.length === 0) {
    return <Typography>We couldn't find this movie</Typography>;
  }
 

  const displayedMovies = searchResults.map((m) => {
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
