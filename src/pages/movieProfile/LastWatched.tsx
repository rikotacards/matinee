import { CalendarMonth, MoreHoriz } from "@mui/icons-material";
import { Box, Dialog, Typography } from "@mui/material";

import React from "react";

export const LastWatched: React.FC = () => {
  const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box
      onClick={onClick}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <CalendarMonth fontSize="small" color="disabled" sx={{ mr: 1 }} />
      <Typography sx={{ mr: "auto" }} color="textSecondary" variant="caption">
        Add watch date
      </Typography>
      <MoreHoriz fontSize="small" />
      <Dialog open={open} onClose={onClose}>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider> */}
      </Dialog>
    </Box>
  );
};
