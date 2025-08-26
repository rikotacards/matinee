import {
  Box,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Card,
} from "@mui/material";
import React from "react";
import { useAddItem } from "../hooks/mutations/useAddItem";
import { useAuth } from "../hooks/useAuth";
import type { Item } from "../types/supabaseTypes";
import { useUpdateItem } from "../hooks/mutations/useUpdateItem";
import { InputSpacingLabel } from "./InputSpacingLabel";
import { useSearchMovies } from "../hooks/queries/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import { TitleOption } from "./TitleOption";
interface AddItemFormProps {
  list_id: string;
  onClose: () => void;
  item?: Item;
}
const ratings = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
export const AddItemForm: React.FC<AddItemFormProps> = ({
  list_id,
  onClose,
  item,
}) => {
  const add = useAddItem();
  const updateItem = useUpdateItem();
  const { user } = useAuth();
  const [apiItemId, setApiItemId] = React.useState("");
  const [selected, setSelected] = React.useState();
  const [name, setName] = React.useState(item?.name || "");
  const [rating, setRating] = React.useState<string>(
    `${item?.rating || 0}` || "0"
  );
  const debounced = useDebounce(name, 500);
  const { data: movies, isLoading } = useSearchMovies(debounced, apiItemId);
  const [dateWatched, setDate] = React.useState<string | null>(
    item?.date_watched || null
  );

  const onSelect = (apiItemId: string, name: string) => {
    setApiItemId(apiItemId);
    setName(name);
  };
  const onChange = (title: string) => {
    setName(title);
    setSelected();
  };

  const onClick = async () => {
    if (!user) {
      return null;
    }
    if (!list_id) {
      return;
    }
    if (item) {
      await updateItem.mutate({
        itemId: item.id,
        newName: name,
        newRating: rating,
        date_watched: dateWatched,
        list_id,
      });
    } else {
      await add.mutate({
        list_id,
        user_id: user.id,
        name,
        rating: Number(rating),
        date_watched: dateWatched,
        api_id: apiItemId,
      });
    }
    onClose();
  };
  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <InputSpacingLabel label="Title">
        <TextField
          placeholder="Search"
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress
                    sx={{
                      visibility: isLoading ? "visible" : "hidden",
                      scale: 0.5,
                    }}
                  />
                </Box>
              ),
            },
          }}
          value={name}
          onChange={(e) => onChange(e.target.value)}
        />
      </InputSpacingLabel>
      {selected && (
        <TitleOption
          posterPath={selected.poster_path}
          title={selected.original_title}
          releaseDate={selected.release_date}
        />
      )}
      <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
        {!selected &&
          movies?.map((m) => (
            <Box
              onClick={() => {
                onSelect(m.id, m.original_title);
                setSelected(m);
              }}
            >
              <TitleOption
                posterPath={m.poster_path}
                title={m.original_title}
                releaseDate={m.release_date}
              />
            </Box>
          ))}
      </Box>

      <InputSpacingLabel label={"Rating"}>
        <Card
          variant="outlined"
          sx={{
            border: "1px solid",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {ratings.map((r) => (
            <IconButton color={rating === r ? 'warning' : undefined} onClick={() => setRating(r)} size="small">
              {<Typography variant="caption">{r}</Typography>}
            </IconButton>
          ))}
        </Card>
      </InputSpacingLabel>
      <InputSpacingLabel label="Watched on">
        <TextField
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          value={dateWatched}
          variant="outlined"
        />
      </InputSpacingLabel>

      <Button sx={{ mt: 2 }} onClick={onClick} fullWidth variant="contained">
        {item ? "Update" : "Add"}
      </Button>
    </Box>
  );
};
