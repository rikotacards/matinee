import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { ListRow } from "../components/ListRow";
import { useAddItemToList } from "../hooks/mutations/useAddItemToList";
interface AddToListPageProps {
  itemId?: string | null;
  onClose: () => void;
}
export const AddToListPage: React.FC<AddToListPageProps> = ({ itemId, onClose }) => {
  const { user } = useAuth();

  const addToList = useAddItemToList();

  const onAddItemToList = async(listId: string | null) => {
    if (!listId) {
      return;
    }
    await addToList.mutateAsync({ item_id: itemId, list_id: listId });
    onClose();

  };
  const lists = useGetLists(user?.id);
  if (lists.isLoading) {
    return <CircularProgress />;
  }

  const displayedLists = lists.data?.map((l) => (
    <ListRow
      onClick={() => onAddItemToList(l.id)}
      listId={l.id}
      name={l.name}
    />
  ));
  return (
    <Box sx={{p:1}} component={Paper}>
      <Button>Create New List</Button>
      {displayedLists}
    </Box>
  );
};
