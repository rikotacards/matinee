import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { ListRow } from "../components/ListRow";
interface AddToListPageProps {
  onClose: () => void;
  onAdd: (listId: string) => Promise<void>
}
export const AddToListPage: React.FC<AddToListPageProps> = ({ onAdd }) => {
  const { user } = useAuth();


  
  const lists = useGetLists(user?.id);
  if (lists.isLoading) {
    return <CircularProgress />;
  }

  const displayedLists = lists.data?.map((l) => (
    <ListRow
    key={l.id}
      onClick={() => onAdd(l.id)}
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
