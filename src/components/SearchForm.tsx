import React from "react";
import { useSearchMovies, type SearchResult } from "../hooks/queries/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import {
  Autocomplete,
  Box,
  TextField,
} from "@mui/material";
import { TitleOption } from "./TitleOption";
interface SearchFormProps {
  onSelect: (movie: SearchResult) => void;
}
export const SearchForm: React.FC<SearchFormProps> = ({ onSelect }) => {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const debounced = useDebounce(inputValue, 500);
  const { data: movies } = useSearchMovies(debounced, "");
  return (
    <Autocomplete
      sx={{ p: 2 }}
      value={value}
      onChange={(_, newValue: string | null) => {
        setValue(newValue);
      }}
      options={movies || []}
      renderOption={(_, option) => {
        return (
          <Box onClick={() => onSelect(option)}>
            <TitleOption
              posterPath={option.poster_path}
              releaseDate={option.release_date}
              title={option.original_title}
            />
          </Box>
        );
      }}
      noOptionsText={
        inputValue === "" ? "Start typing to search..." : "No options"
      }
      getOptionLabel={(option) => option.original_title}
      renderInput={(params) => (
        <TextField 
        
        placeholder="Search" variant="outlined" {...params} />
      )}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  );
};
