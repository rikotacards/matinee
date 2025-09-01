import { Lists } from "./pages/Lists";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "./Theme";
import { Layout } from "./layouts/Layout";
import { Route, Routes } from "react-router";
import { ListPage } from "./pages/ListPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AllFilms } from "./pages/AllFilms";
import { SnackbarProvider } from "notistack";
import { MyWatchlistPage } from "./pages/WatchlistPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { SearchPage } from "./pages/SearchPage";
import { MovieProfileNew } from "./pages/movieProfile/MovieProfileNew";
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
                <Route index element={<AllFilms />} />
                <Route path="all-films" element={<AllFilms />} />
                <Route path="lists" element={<Lists />} />
                <Route path={"lists/:list_id"} element={<ListPage />} />
                <Route path="watchlist" element={<MyWatchlistPage />} />
                <Route path="profile" element={<PublicProfilePage />} />

                <Route path="profile" element={<PublicProfilePage />} />
                <Route path={"/search"} element={<SearchPage />} />
                <Route
                  path={"/movies/:movie_ref_id/:is_internal/*"}
                  element={<MovieProfileNew />}
                />
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
