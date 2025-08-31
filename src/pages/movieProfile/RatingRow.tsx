import { Delete, MoreHoriz } from "@mui/icons-material";
import {
  Stack,
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
  isOwner?: boolean;
  movie_ref_id: number;
}

export const RatingRow: React.FC<RatingRowProps> = ({
  isOwner,
  rating,
  userId,
  movie_ref_id,
}) => {
  const { name, onCloseDialog, setDialogName } = useDialogControl();

  return (
    <Box>
      <Stack alignItems={"center"} direction="row">
        <Typography variant="caption" sx={{ mr: 1 }} fontWeight={"bold"}>
          {userId}
        </Typography>
        <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
          rated
        </Typography>
      <Box >

        <RatingDisplay textVariant="caption" rating={rating} />
      </Box>

        <Box
          onClick={() => setDialogName("options")}
          sx={{ visibility: isOwner ? "visible" : "hidden", ml:'auto' }}
        >
          <MoreHoriz fontSize="small"/>
        </Box>
      </Stack>
      <Dialog onClose={onCloseDialog} open={name === "options"}>
        <Box
          sx={{ p: 1, minWidth: 300, display: "flex", flexDirection: "column" }}
        >
          <Button
            sx={{ mb: 1 }}
            variant="outlined"
            fullWidth
            color="error"
            startIcon={<Delete />}
          >
            Delete rating
          </Button>
          <Button
            sx={{ mb: 1 }}
            variant="outlined"
            onClick={() => setDialogName("edit")}
            fullWidth
          >
            Edit rating
          </Button>
          <Button variant="outlined" onClick={onCloseDialog} fullWidth>
            Cancel
          </Button>
        </Box>
      </Dialog>
      <Dialog onClose={onCloseDialog} open={name === "edit"}>
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <RatingInputForm
            onClose={onCloseDialog}
            movie_ref_id={movie_ref_id}
            rating={rating}
          />
          <Button onClick={onCloseDialog} fullWidth>
            Cancel
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};
