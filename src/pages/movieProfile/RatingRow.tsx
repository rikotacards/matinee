import { Delete, MoreHoriz } from "@mui/icons-material";
import {
  Stack,
  Avatar,
  Typography,
  Box,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import React from "react";
import { RatingDisplay } from "../../components/RatingDisplay";
import { useDialogControl } from "../../hooks/useDialogControl";
import { RatingInputForm } from "../../components/RatingInputForm";
interface RatingRowProps {
  rating: number;
  userId: string;
}
export const RatingRow: React.FC<RatingRowProps> = ({ rating, userId}) => {
  const { name, onCloseDialog, setDialogName } = useDialogControl();
  return (
    <Box>
      <Stack alignItems={"center"} direction="row">
        <Typography variant='body2' sx={{ mr: 1 }} fontWeight={"bold"}>
          {userId}
        </Typography>
        <Typography variant='body2' color="textSecondary" sx={{ mr: 1 }}>
          rated
        </Typography>
        <RatingDisplay textVariant="body2" rating={rating} />
        <Box sx={{ ml: "auto" }}>
            <MoreHoriz fontSize="small" />
        </Box>
      </Stack>
      <Dialog onClose={onCloseDialog} open={name === "options"}>
        <Box sx={{ minWidth: 300, display: "flex", flexDirection: "column" }}>
          <Button fullWidth color="error" startIcon={<Delete />}>
            Delete rating
          </Button>
          <Button onClick={() => setDialogName("edit")} fullWidth>
            Edit rating
          </Button>
          <Button onClick={onCloseDialog} fullWidth>
            Cancel
          </Button>
        </Box>
      </Dialog>
      <Dialog onClose={onCloseDialog} open={name === "edit"}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <RatingInputForm rating={rating} />
          <Button fullWidth>Cancel</Button>
        </Box>
      </Dialog>
    </Box>
  );
};
