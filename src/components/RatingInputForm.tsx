import { Box, Button, Rating } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { useAuth } from "../hooks/useAuth";
import { useUpsertRating } from "../hooks/mutations/useUpsertRating";
interface RatingInputForm {
  rating?: number;
  movie_ref_id: number;

  onClose: () => void;
}
export const RatingInputForm: React.FC<RatingInputForm> = ({
  rating,
  onClose,
  movie_ref_id,
}) => {
  const [value, setValue] = React.useState<number>(rating || 0);
  const { user } = useAuth();
  const updateRating = useUpsertRating();
  const onDone = () => {
    if (!user?.id) {
      return;
    }
    updateRating.mutate({
      rating: value,
      user_id: user.id,
      movie_ref_id,
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
