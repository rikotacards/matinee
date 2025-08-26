import { Box, Button, CircularProgress, Dialog } from "@mui/material";
import React from "react";

import { ListPreview } from "../components/ListPreview";
import { CreateNewListForm } from "../components/CreateNewListForm";
import { useGetLists } from "../hooks/queries/getLists";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

export const Lists: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };

  const nav = useNavigate();
  const onGo = (list_id: string) => {
    nav(`/list/${list_id}`)
  }
  const { user } = useAuth();
  const lists = useGetLists(user?.id || "");
  if (lists.isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{}}>
      <Button
        onClick={() => setOpen(true)}
        sx={{ mb: 1 }}
        fullWidth
        variant="outlined"
      >
        Create New List
      </Button>

      {lists.data?.map((l) => (
        <ListPreview onClick={() => onGo(l.id)} name={l.name} />
      ))}
      <Dialog open={open} onClose={onClose}>
        <CreateNewListForm onClose={onClose} />
      </Dialog>
    </Box>
  );
};
