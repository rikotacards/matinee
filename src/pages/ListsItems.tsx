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
interface ListOptionsWrapperProps {
  children: React.ReactNode;
  showOptions: boolean;
  listId: string;
}
const ListOptionsWrapper: React.FC<ListOptionsWrapperProps> = ({
  children,
  listId,
  showOptions,
}) => {
  const deleteList = useDeleteList();
  const deleteIcon = deleteList.isPending ? (
    <CircularProgress
      sx={{ ml: 1, heigh: 20, width: 20 }}
      size={"small"}
      color="error"
    />
  ) : (
    <IconButton
      onClick={
        deleteList.isPending ? undefined : () => deleteList.mutate(listId)
      }
      sx={{ ml: 1 }}
    >
      <Delete color="error" />
    </IconButton>
  );
  return (
    <Box sx={{width:'100%', display: "flex", flexDirection: "row", alignItems: "center" }}>
      {children}
      {showOptions && deleteIcon}
    </Box>
  );
};
export const ListsItems: React.FC<LoadedListsProps> = ({
  dialogName,
  userId,
}) => {
  const nav = useNavigate();
  const onGo = (list_id: string) => {
    nav(`/lists/${list_id}`);
  };
  const lists = useGetLists(userId);

  if (lists.isLoading) {
    return (
      <Box sx={{display: 'flex', width:'100%', flexDirection: "column"}}>
        <ListRowSkeleton />
        <ListRowSkeleton />
        <ListRowSkeleton />
      </Box>
    );
  }
  if (lists.data?.length === 0) {

    return <Box sx={{display: 'flex', width:'100%'}}>
      <Typography>You have no lists.</Typography>
      </Box>
  }

  return (
    <Box sx={{display:'flex', flexDirection: 'column', width:'100%'}}>
      {lists.data?.map((l) => (
        <Box  key={l.id} sx={{display: 'flex', width:'100%', mb: 1 }}>
          <ListOptionsWrapper
            listId={l.id}
            showOptions={dialogName === "more"}
          >
            <ListRow listId={l.id} onClick={() => onGo(l.id)} name={l.name} />
          </ListOptionsWrapper>
        </Box>
      ))}
    </Box>
  );
};
