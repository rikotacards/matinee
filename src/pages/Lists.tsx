import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import { ListRow } from "../components/ListRow";
import { CreateNewListForm } from "../components/CreateNewListForm";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { Add, Check, Delete, MoreHoriz } from "@mui/icons-material";
import { useDialogControl } from "../hooks/useDialogControl";
import { useDeleteList } from "../hooks/mutations/useDeleteList";

export const Lists: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { name, onCloseDialog, setDialogName } = useDialogControl();
  const nav = useNavigate();
  const onGo = (list_id: string) => {
    nav(`/lists/${list_id}`);
  };
  const deleteList = useDeleteList();
  const { user } = useAuth();
  const lists = useGetLists(user?.id);
  const deleteIcon = deleteList.isPending ? (
    <CircularProgress
      sx={{ heigh: 20, width: 20 }}
      size={"small"}
      color="error"
    />
  ) : (
    <Delete color="error" />
  );
  if (lists.isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{}}>
      <Stack sx={{ mb: 1 }} direction={"row"} alignItems={"center"}>
        <Typography fontWeight="bold" variant="h4">
          Lists
        </Typography>

        <IconButton
          sx={{
            ml: "auto",
            visibility: name === "more" ? "hidden" : "visible",
          }}
          onClick={() => setOpen(true)}
        >
          <Add />
        </IconButton>
        {name == "more" ? (
          <IconButton onClick={onCloseDialog} size="small">
            <Check />
          </IconButton>
        ) : (
          <IconButton onClick={() => setDialogName("more")}>
            <MoreHoriz />
          </IconButton>
        )}
      </Stack>

      {lists.data?.map((l) => (
        <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
          <ListRow listId={l.id} onClick={() => onGo(l.id)} name={l.name} />
          {name === "more" && (
            <IconButton
              onClick={
                deleteList.isPending ? undefined : () => deleteList.mutate(l.id)
              }
              sx={{ ml: 1 }}
            >
              {deleteIcon}
            </IconButton>
          )}
        </Box>
      ))}
      <Dialog open={open} onClose={onClose}>
        <CreateNewListForm onClose={onClose} />
      </Dialog>
    </Box>
  );
};
