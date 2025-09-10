import {
  Button,
  Dialog,
  IconButton,
} from "@mui/material";
import React from "react";

import { CreateNewListForm } from "../components/CreateNewListForm";
import { useGetLists } from "../hooks/queries/useGetLists";
import { useAuth } from "../hooks/useAuth";
import { Add, MoreHoriz } from "@mui/icons-material";
import { useDialogControl } from "../hooks/useDialogControl";
import { ListsItems } from "./ListsItems";
import { PageWrapper } from "../layouts/PageWrapper";
import { UnAuthedList } from "./UnAuthedLists";

export const Lists: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { name, onCloseDialog, setDialogName } = useDialogControl();

  const { user } = useAuth();
  const lists = useGetLists(user?.id);
  if (!user?.id) {
    return <UnAuthedList/>
  }
  return (
    <PageWrapper
      pageName="Lists"
      buttons={
        <>
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
            <Button size="small" onClick={onCloseDialog}>
              Done
            </Button>
          ) : (
            <IconButton
              disabled={!lists.data?.length}
              onClick={() => setDialogName("more")}
            >
              <MoreHoriz />
            </IconButton>
          )}
        </>
      }
    >
      <ListsItems dialogName={name} userId={user.id} />

      <Dialog fullScreen open={open} onClose={onClose}>
        <CreateNewListForm onClose={onClose} />
      </Dialog>
    </PageWrapper>
  );
};
