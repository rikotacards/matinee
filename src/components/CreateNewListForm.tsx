import { Close } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  Toolbar,
  IconButton,
  AppBar,
  DialogContent,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useAddList } from "../hooks/mutations/AddList";
interface CreateNewListFormProps {
  onClose: () => void;
}
export const CreateNewListForm: React.FC<CreateNewListFormProps> = ({
  onClose,
}) => {
  const [name, setName] = React.useState("");
  const { user } = useAuth();
  const add = useAddList();
  const onClick = async() => {
    if (!user) {
      console.warn("no user");
      return;
    }
    await add.mutate({ name, user_id: user.id });
    onClose();
  };
  return (
    <Box sx={{ p: 0 }}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          New List
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box>
          <TextField
            onChange={(e) => setName(e.target.value)}
            placeholder="List name"
            fullWidth
            variant="outlined"
          />
        </Box>
        <Button onClick={onClick} sx={{ mt: 1 }} fullWidth variant="contained">
          {add.isPending ? `Adding` : "Create"}
        </Button>
      </DialogContent>
    </Box>
  );
};
