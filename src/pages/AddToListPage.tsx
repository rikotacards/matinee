import React from "react";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Dialog, Paper, Stack } from "@mui/material";
import { ListRow } from "../components/ListRow";
import { ListRowSkeleton } from "../components/ListRowSkeleton";
import { CreateNewListForm } from "../components/CreateNewListForm";
import { useDialogControl } from "../hooks/useDialogControl";
interface AddToListPageProps {
  onClose: () => void;
  onAdd: (listId: string) => Promise<void>;
}
export const AddToListPage: React.FC<AddToListPageProps> = ({ onAdd }) => {
  const { user } = useAuth();
  const { name, setDialogName, onCloseDialog } = useDialogControl();

  const lists = useGetLists(user?.id);

  const displayedLists = lists.data?.map((l) => (
    <Box    sx={{mb:1}}     key={l.id}
>
      <ListRow
        onClick={() => onAdd(l.id)}
        listId={l.id}
        name={l.name}
      />
    </Box>
  ));
  return (
    <Box sx={{ p: 1, width: 200 }} component={Paper}>
      <Button onClick={() => setDialogName("create")} sx={{ mb: 1 }} fullWidth>
        Create New List
      </Button>
      {lists.isLoading ? (
        <Stack direction="column">
          <ListRowSkeleton />
          <ListRowSkeleton />
          <ListRowSkeleton />
        </Stack>
      ) : (
        displayedLists
      )}
      <Dialog fullScreen open={name === "create"} onClose={onCloseDialog}>
        <CreateNewListForm onClose={onCloseDialog} />
      </Dialog>
    </Box>
  );
};
