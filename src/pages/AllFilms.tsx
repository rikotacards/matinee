import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { AllFilmsNotLoggedIn } from "./AllFilmsNotLoggedIn";
import { Add, Close, MoreHoriz } from "@mui/icons-material";
import { SearchPage } from "./SearchPage";
import { AllFilmsItems } from "./AllFilmsItems";
import { PageWrapper } from "../layouts/PageWrapper";
import { useDialogControl } from "../hooks/useDialogControl";

export const AllFilms: React.FC = () => {
  const { session, user } = useAuth();
  
  const {name, setDialogName, onCloseDialog} = useDialogControl()

  if (!session || !user) {
    return <AllFilmsNotLoggedIn />;
  }

  return (
      <PageWrapper
        buttons={
          <>
            {name === '' && <IconButton onClick={() => setDialogName('add')}>
              <Add />
            </IconButton>}
            {name == '' && <IconButton onClick={() => setDialogName('more')}>
              <MoreHoriz/>
            </IconButton>}
            {name == 'more' && <Button size='small' onClick={onCloseDialog}>Done</Button>}
          </>
        }
        pageName="Your films"
      >
        <AllFilmsItems showMoreOptions={name === 'more'} userId={user.id} />
      <Dialog fullScreen open={name === 'add'} onClose={onCloseDialog}>
        <AppBar variant="outlined" position="relative">
          <Toolbar>
            <Typography sx={{ mr: "auto" }}>Search</Typography>
            <IconButton sx={{ mr: 1 }} onClick={onCloseDialog}>
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ height: "100%" }} elevation={0} component={Card}>
          <SearchPage />
        </Box>
      </Dialog>
      </PageWrapper>

  );
};
