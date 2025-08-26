import { Lists } from "./pages/Lists";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme";
import { Layout } from "./layouts/Layout";
import { Route, Routes } from "react-router";
import { ListPage } from "./pages/ListPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllFilms } from "./pages/AllFilms";
import { SnackbarProvider } from "notistack";
import { MovieProfile } from "./pages/MovieProfile";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <AuthProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="login" element={<LoginPage />} />
                {/* <Route element={<ProtectedRoute />}> */}
                <Route index element={<Lists />} />
                <Route path="all-films" element={<AllFilms />} />
                <Route path="lists" element={<Lists />} />
                <Route path={'/movies/:movie_id'} element={<MovieProfile/>}/>
                <Route path={"list/:list_id"} element={<ListPage />} />
                {/* </Route> */}
              </Route>
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
