import { Box, Button, Rating } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../hooks/useAuth";
import { useUpdateUserItem } from "../hooks/mutations/useUpdateUserItem";
import { useCheckAndPopulateNew } from "../hooks/mutations/useCheckAndPopulateNew";
interface RatingInputForm {
  rating?: number;
  movie_ref_id: number | string;

  onClose: () => void;
}
export const RatingInputForm: React.FC<RatingInputForm> = ({
  rating,
  onClose,
  movie_ref_id,
}) => {
  const [value, setValue] = React.useState<number>(rating || 0);
  const { user } = useAuth();
  const updateUserItem = useUpdateUserItem();
  const c = useCheckAndPopulateNew(movie_ref_id);
  const onDone = async () => {
    if (!user?.id) {
      return;
    }
    const item = await c();
    if (!item) {
      return;
    }
    await updateUserItem.mutateAsync({
      updatePayload: { status: "watched", rating: value },
      itemId: item.id,
      movieRefId: item.movie_ref_id,
      userId: user.id,
    });

    onClose();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minWidth: 300,
        alignItems: "center",
      }}
    >
      <Rating
        size="large"
        name="hover-feedback"
        value={value}
        precision={0.5}
        onChange={(_, newValue) => {
          setValue(newValue || 0);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Button sx={{ mt: 1 }} fullWidth onClick={onDone}>
        {rating !== undefined ? "Update" : "Done"}
      </Button>
    </Box>
  );
};
