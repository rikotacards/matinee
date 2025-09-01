import { Box, Button, Rating } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../hooks/useAuth";
import { useUpsertRating } from "../hooks/mutations/useUpsertRating";
import { useCheckAndPopulateUserItem } from "../hooks/mutations/useCheckAndPopulate";
import { useUpdateUserItem } from "../hooks/mutations/useUpdateUserItem";
interface RatingInputForm {
  rating?: number;
  movie_ref_id: number;
  isInternal: boolean;

  onClose: () => void;
}
export const RatingInputForm: React.FC<RatingInputForm> = ({
  rating,
  onClose,
  movie_ref_id,
  isInternal,
}) => {
  const [value, setValue] = React.useState<number>(rating || 0);
  const { user } = useAuth();
  const updateRating = useUpsertRating();
  const updateUserItem = useUpdateUserItem();
  const c = useCheckAndPopulateUserItem(movie_ref_id, isInternal);
  const onDone = async () => {
    if (!user?.id) {
      return;
    }
    const item = await c();
    if (item.status !== "watched") {
      await updateUserItem.mutateAsync({
        updatePayload: { status: "watched" },
        itemId: item.id,
        movieRefId: item.movie_ref_id,
        userId: user.id,
      });
    }
    await updateRating.mutate({
      rating: value,
      user_id: user.id,
      movie_ref_id: item.movie_ref_id,
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
