import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import { CreateNewListForm } from "../components/CreateNewListForm";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Add, Check, MoreHoriz } from "@mui/icons-material";
import { useDialogControl } from "../hooks/useDialogControl";
import { ListsItems } from "./ListsItems";

export const Lists: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { name, onCloseDialog, setDialogName } = useDialogControl();

  const { user } = useAuth();
  const lists = useGetLists(user?.id);
  if(!user?.id){
    return null
  }
  return (
    <Box sx={{ minWidth: 300 }}>
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
          <IconButton
            disabled={!lists.data?.length}
            onClick={() => setDialogName("more")}
          >
            <MoreHoriz />
          </IconButton>
        )}
      </Stack>

      <ListsItems dialogName={name} userId={user.id} />
      <Dialog open={open} onClose={onClose}>
        <CreateNewListForm onClose={onClose} />
      </Dialog>
    </Box>
  );
};
