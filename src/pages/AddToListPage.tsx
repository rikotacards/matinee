import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Paper, Stack } from "@mui/material";
import { ListRow } from "../components/ListRow";
import { ListRowSkeleton } from "../components/ListRowSkeleton";
interface AddToListPageProps {
  onClose: () => void;
  onAdd: (listId: string) => Promise<void>
}
export const AddToListPage: React.FC<AddToListPageProps> = ({ onAdd }) => {
  const { user } = useAuth();


  
  const lists = useGetLists(user?.id);
 

  const displayedLists = lists.data?.map((l) => (
    <ListRow
    key={l.id}
      onClick={() => onAdd(l.id)}
      listId={l.id}
      name={l.name}
    />
  ));
  return (
    <Box sx={{p:1, width:200}} component={Paper}>
      <Button sx={{mb:1}} fullWidth>Create New List</Button>
      {lists.isLoading ? <Stack direction='column'>

        <ListRowSkeleton/>
        <ListRowSkeleton/>
        <ListRowSkeleton/>
      </Stack> : displayedLists}
    </Box>
  );
};
