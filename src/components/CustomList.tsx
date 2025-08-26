import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { CustomItem } from "./CustomItem";
import { DialogWrapper } from "./DialogWrapper";
import { useNavigate, useParams } from "react-router";
import { useGetItemsByList } from "../hooks/queries/useGetItemsByList";
import { Add, MoreVert } from "@mui/icons-material";
import { useDeleteList } from "../hooks/mutations/deleteList";
import { useUpdateListName } from "../hooks/mutations/editList";
import type { Item } from "../types/supabaseTypes";
import { AddItemFormNew } from "./AddItemFormNew";
import { ItemDialog } from "./ItemDialog";

interface CustomListProps {
  name: string;
  isOwner: boolean;
  owner: string;
}
export const CustomList: React.FC<CustomListProps> = ({
  owner,
  isOwner,
  name,
}) => {
  const params = useParams();
  const items = useGetItemsByList(params.list_id || "");
  console.log("i", items.data);
  const [dialog, setDialog] = React.useState("");
  const nav = useNavigate();
  const [newName, setNewName] = React.useState(name);
  const [selectedId, setRow] = React.useState<Item["id"] | undefined>(
    undefined
  );
  const onCloseRow = () => {
    setRow(undefined);
  };
  const onRowClick = (id: Item["id"]) => {
    setRow(id);
  };

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
  if (items.isLoading) {
    return <CircularProgress />;
  }
  const options = [
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
  const selectedItem: Item = items.data?.find((d) => d?.id === selectedId);
  console.log("hi", selectedItem);
  return (
    <Box>
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
          {name}
        </Typography>
        {isOwner && (
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
      <Box>
      
      </Box>
      <DialogWrapper open={dialog === "add"} title={"Add"} onClose={onClose}>
        <AddItemFormNew onClose={onClose} list_id={params.list_id} />
      </DialogWrapper>
      <DialogWrapper open={dialog === "more"} title="options" onClose={onClose}>
        {options.map((b) => (
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
      <DialogWrapper onClose={onCloseRow} title="Details" open={!!selectedId}>
        {selectedItem && (
          <ItemDialog
            api_id={selectedItem.api_id}
            listId={params.list_id}
            onClose={onCloseRow}
            item={selectedItem}
          />
        )}
      </DialogWrapper>

      {items.data?.map((i) => (
        <Box key={i.name} onClick={() => onRowClick(i.id)}>
          <CustomItem
            api_id={i.api_id}
            dateWatched={i.date_watched}
            key={i.name}
            name={i.name}
            rating={i.rating}
          />
        </Box>
      ))}
    </Box>
  );
};
