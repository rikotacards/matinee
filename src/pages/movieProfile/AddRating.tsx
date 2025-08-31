import { Box, Button, Card } from "@mui/material";
import React from "react";
import { RatingInputForm } from "../../components/RatingInputForm";
interface AddRatingProps {
  movie_ref_id: number;
}
export const AddRating: React.FC<AddRatingProps> = ({ movie_ref_id }) => {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  if (open) {
    return (
      <Box component={Card} sx={{p:1,display: 'flex', flexDirection: 'column'}}>
        <RatingInputForm movie_ref_id={movie_ref_id} onClose={onClose} />
        <Button onClick={onClose} fullWidth>Cancel</Button>
      </Box>
    );
  } else {
    return (
      <Button sx={{mt:1}} variant="contained" onClick={onOpen} fullWidth>
        Add Rating
      </Button>
    );
  }
};
