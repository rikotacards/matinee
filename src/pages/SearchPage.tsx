import { Close } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { InfoOutline, ChevronRight } from "@mui/icons-material";
import { useDebounce } from "../hooks/useDebounce";
import { SearchResult } from "./SearchResult";
import { useSearchMovies } from "../hooks/queries/useSearchMovies";
import { MovieItemSkeletonList } from "./MovieItemSkeletonList";
interface SearchPageProps {
  listId?: string;
  enableAddToList?: boolean;
  onClose?: () => void;
}
export const SearchPage: React.FC<SearchPageProps> = ({
  listId,
  enableAddToList,
  onClose,
}) => {
  const [showClear, setClear] = React.useState(false);
  const [text, setText] = React.useState("");
  const onClear = () => {
    setClear(false);
    setText("");
  };
  const debouncedName = useDebounce(text, 500);
  const { data: searchResults, isLoading } = useSearchMovies(debouncedName);
  const displayedIcon = isLoading ? (
    <CircularProgress size={30} />
  ) : (
    <IconButton onClick={() => onClear()}>
      {showClear ? <Close /> : <ChevronRight />}
    </IconButton>
  );
  const onChange = (e: string) => {
    setClear(true);
    setText(e);
  };
  return (
    <Box
      sx={{
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        width: 400,
        mt: 2,
        overflow: "hidden",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search movie"
        autoFocus={true}
        value={text}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">{displayedIcon}</InputAdornment>
          ),
        }}
        onChange={(e) => onChange(e.target.value)}
      />
      <Box sx={{ mt: 2, mb: 2, display: "flex", flexDirection: "row" }}>
        <InfoOutline fontSize="small" color="info" sx={{ mr: 1 }} />
        <Typography color="textSecondary" variant="body2">
          You can only search for movies. Tv shows coming soon.
        </Typography>
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          display: "flex",
        }}
      >
        {isLoading && (
          <MovieItemSkeletonList rows={10}/>
        )}
        {!isLoading && debouncedName && (
          <SearchResult
            listId={listId}
            onClose={onClose}
            searchResults={searchResults || []}
            enableAddToList={enableAddToList}
          />
        )}
      </Box>
    </Box>
  );
};
