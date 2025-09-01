import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { DialogWrapper } from "./DialogWrapper";
import { useNavigate, useParams } from "react-router";
import { Add, Close, Delete, MoreVert } from "@mui/icons-material";
import { useDeleteList } from "../hooks/mutations/useDeleteList";
import { useUpdateListName } from "../hooks/mutations/useUpdateListName";
import type { IList } from "../hooks/queries/useGetListById";
import { useAuth } from "../hooks/useAuth";
import { SearchPage } from "../pages/SearchPage";
import { CustomListItems } from "./CustomListItems";
import { BackIconButton } from "./BackIconButton";

interface CustomListProps {
  list: IList;
}
export const CustomList: React.FC<CustomListProps> = ({ list }) => {
  const { user } = useAuth();
  const params = useParams();
  const [dialog, setDialog] = React.useState("");
  const nav = useNavigate();
  const [newName, setNewName] = React.useState(list.name);
  const onClose = () => {
    setDialog("");
  };

  const updateList = useUpdateListName();
  const onUpdateListName = async () => {
    if (!params.list_id) {
      return;
    }
    await updateList.mutate({ listId: params.list_id, newName });
    onClose();
  };
  const onUpdateClick = () => {
    setDialog("updateName");
  };
  const deleteAction = useDeleteList();
  const onDelete = async () => {
    if (!params.list_id) {
      return;
    }
    await deleteAction.mutate(params.list_id || "");
    nav(-1);
  };
  if (!params.list_id) {
    return <Box>Error no list</Box>;
  }

  const listActions = [
    {
      name: "Make private",
    },
    {
      name: "rename",
      onClick: onUpdateClick,
    },
    {
      name: "Share",
    },
    {
      name: "Reorder items",
    },
    {
      name: "Delete list",
      onClick: onDelete,
    },
  ];

  return (
    <Box>
              <BackIconButton/>
      
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          {list.name}
        </Typography>
        {list.user_id === user?.id && (
          <IconButton onClick={() => setDialog("add")} sx={{ ml: "auto" }}>
            <Add />
          </IconButton>
        )}
        <IconButton
          onClick={() => setDialog("more")}
          size="small"
          sx={{ textTransform: "capitalize" }}
        >
          <MoreVert />
        </IconButton>
      </Box>
      <Box></Box>
      <Dialog fullScreen open={dialog === "add"} onClose={onClose}>
        <AppBar variant="outlined" position="relative">
          <Toolbar>
            <Typography sx={{ mr: "auto" }}>Add to list</Typography>
            <IconButton sx={{ mr: 1 }} onClick={onClose}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%" }} elevation={0} component={Card}>
          <SearchPage
            listId={params.list_id}
            enableAddToList
            onClose={onClose}
          />
        </Box>
      </Dialog>
      <DialogWrapper open={dialog === "more"} title="options" onClose={onClose}>
        {listActions.map((b) => (
          <Button
            fullWidth
            onClick={b.onClick ? () => b.onClick() : undefined}
            key={b.name}
          >
            {b.name}
          </Button>
        ))}
      </DialogWrapper>
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

      <CustomListItems listId={list.id} listOwner={list.user_id} />
    </Box>
  );
};
