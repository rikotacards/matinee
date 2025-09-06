import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { ListRow } from "../components/ListRow";
import { useAddToListByMovieId } from "../hooks/useAddToListByMovieId";
interface AddToListPageProps {
  movieId: string | number
  isInternal: boolean;
  onClose: () => void;
}
export const AddToListPage: React.FC<AddToListPageProps> = ({ movieId,isInternal, onClose }) => {
  const { user } = useAuth();

  const add = useAddToListByMovieId(movieId, isInternal);

  const onAddItemToList = async(listId: string | null) => {
    if (!listId) {
      return;
    }
    await add( listId);
    onClose();

  };
  const lists = useGetLists(user?.id);
  if (lists.isLoading) {
    return <CircularProgress />;
  }

  const displayedLists = lists.data?.map((l) => (
    <ListRow
    key={l.id}
      onClick={() => onAddItemToList(l.id)}
      listId={l.id}
      name={l.name}
    />
  ));
  return (
    <Box sx={{p:1}} component={Paper}>
      <Button fullWidth>Create New List</Button>
      {displayedLists}
    </Box>
  );
};
