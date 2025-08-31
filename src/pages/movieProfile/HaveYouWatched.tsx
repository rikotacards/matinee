import { Check, Close } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
interface HaveYouWatchedProps {
    onUpdate: (arg: string) => Promise<void>
}
export const HaveYouWatched: React.FC<HaveYouWatchedProps> = ({onUpdate}) => {

  return (
    <Box component={Card} sx={{p:1, mt:1, justifyContent: 'center'}}>
      <Typography fontWeight={''} variant='body2' sx={{mb:1}}>Have you seen this?</Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Button onClick={() => onUpdate('watched')} sx={{mr:0.5}} variant='outlined' fullWidth startIcon={<Check />}>Yes</Button>
        <Button onClick={() => onUpdate('not watched')} startIcon={<Close/>} sx={{ml:0.5}} variant='outlined' fullWidth>No</Button>
      </Box>
    </Box>
  );
};
