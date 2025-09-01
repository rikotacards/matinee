import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React from "react";
import { ListRow } from "../components/ListRow";
import { useNavigate } from "react-router";
import { useDeleteList } from "../hooks/mutations/useDeleteList";
import { Delete } from "@mui/icons-material";
import { useGetLists } from "../hooks/queries/useGetLists";
import { ListRowSkeleton } from "../components/ListRowSkeleton";
interface LoadedListsProps {
  dialogName: string;
  userId: string;
}
export const ListsItems: React.FC<LoadedListsProps> = ({
  dialogName,
  userId,
}) => {
  const nav = useNavigate();
  const onGo = (list_id: string) => {
    nav(`/lists/${list_id}`);
  };
  const lists = useGetLists(userId);

  const deleteList = useDeleteList();
  const deleteIcon = deleteList.isPending ? (
    <CircularProgress
      sx={{ heigh: 20, width: 20 }}
      size={"small"}
      color="error"
    />
  ) : (
    <IconButton
      onClick={deleteList.isPending ? undefined : () => deleteList.mutate(l.id)}
      sx={{ ml: 1 }}
    >
      <Delete color="error" />
    </IconButton>
  );
  if (lists.isLoading) {
    return (
      <Box>
        <ListRowSkeleton />
        <ListRowSkeleton />
        <ListRowSkeleton />
      </Box>
    );
  }
  if (lists.data?.length === 0) {
    return <Typography>Create a new list</Typography>;
  }

  return (
    <Box>
      {lists.data?.map((l) => (
        <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <ListRow listId={l.id} onClick={() => onGo(l.id)} name={l.name} />
          {dialogName === "more" && deleteIcon}
        </Box>
      ))}
    </Box>
  );
};
