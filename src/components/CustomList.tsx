import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Skeleton,
  TextField,
  Toolbar,
  Typography,
  type ButtonProps,
} from "@mui/material";
import React from "react";
import { DialogWrapper } from "./DialogWrapper";
import { useNavigate } from "react-router";
import { Add, Close, Delete, MoreHoriz } from "@mui/icons-material";
import { useDeleteList } from "../hooks/mutations/useDeleteList";
import { useUpdateListName } from "../hooks/mutations/useUpdateListName";
import { useGetListById } from "../hooks/queries/useGetListById";
import { useAuth } from "../hooks/useAuth";
import { SearchPage } from "../pages/SearchPage";
import { CustomListItems } from "./CustomListItems";
import { BackIconButton } from "./BackIconButton";

interface CustomListProps {
  listId: string;
}
export const CustomList: React.FC<CustomListProps> = ({ listId }) => {
  const { user } = useAuth();
  const [dialog, setDialog] = React.useState("");
  const nav = useNavigate();
  const list = useGetListById(listId);
  const [newName, setNewName] = React.useState(list.data?.name || "");
  const onClose = () => {
    setDialog("");
  };

  const updateList = useUpdateListName();
  const onUpdateListName = async () => {
    await updateList.mutate({ listId, newName });
    onClose();
  };
  const onUpdateClick = () => {
    setDialog("updateName");
  };
  const deleteAction = useDeleteList();
  const onDelete = async () => {
    await deleteAction.mutate(listId);
    nav(-1);
  };
  if (!list.isLoading && !list.data?.is_public) {
    return <Typography>List is private</Typography>;
  }

  const listActions = [
    // {
    //   name: "Make private",
    // },
    {
      name: "rename",
      onClick: onUpdateClick,
    },
    // {
    //   name: "Share",
    // },
    // {
    //   name: "Reorder items",
    // },
    {
      name: "Delete list",
      color: "error",
      onClick: onDelete,
    },
    {
      name: "Cancel",
      onClick: onClose,
    },
  ];
  if (list.isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <BackIconButton />
        <Skeleton width={300} variant="text" />
      </Box>
    );
  }
  if (!list.data) {
    return <Typography>This list is empty</Typography>;
  }

  return (
    <Box sx={{display: 'flex', width:'100%', flexDirection: 'column'}}>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width:'100%'
        }}
      >
        <BackIconButton />
        {list.isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Typography variant="h4" fontWeight={"bold"}>
            {list.data.name}
          </Typography>
        )}
        {list.data.user_id === user?.id && (
          <IconButton onClick={() => setDialog("add")} sx={{ ml: "auto" }}>
            <Add />
          </IconButton>
        )}
        <IconButton
          onClick={() => setDialog("more")}
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          <MoreHoriz />
        </IconButton>
      </Box>
      <Dialog fullScreen open={dialog === "add"} onClose={onClose}>
        <AppBar variant="outlined" position="relative">
          <Toolbar>
            <Typography sx={{ mr: "auto" }}>Add to list</Typography>
            <IconButton sx={{ mr: 1 }} onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <SearchPage
          prevPage="list"
          listId={listId}
          enableAddToList
          onClose={onClose}
        />
      </Dialog>
      <Dialog open={dialog === "more"} title="options" onClose={onClose}>
        {listActions.map((b) => (
          <Button
            fullWidth
            color={b.color as ButtonProps["color"]}
            onClick={b.onClick ? () => b.onClick() : undefined}
            key={b.name}
          >
            {b.name}
          </Button>
        ))}
      </Dialog>
      <DialogWrapper
        open={dialog === "updateName"}
        title={"update name"}
        onClose={onClose}
      >
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <TextField
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 1, textTransform: "capitalize" }}
            onClick={onUpdateListName}
          >
            Update
          </Button>
        </Box>
      </DialogWrapper>
      <Dialog open={dialog === "itemMore"} onClose={onClose}>
        <Box sx={{ p: 1, minWidth: 300 }}>
          <Button
            variant="outlined"
            startIcon={<Delete />}
            fullWidth
            color="error"
          >
            Remove from list
          </Button>
          <Button color="inherit" sx={{ mt: 1 }} onClick={onClose} fullWidth>
            Cancel
          </Button>
        </Box>
      </Dialog>

      <CustomListItems listId={list.data.id} listOwner={list.data.user_id} />
    </Box>
  );
};
