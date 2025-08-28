import { Navigate, Outlet} from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LinearProgress } from "@mui/material";

export const ProtectedRoute: React.FC = () => {
  const { session, loading } = useAuth();
  if (loading) {
    return <LinearProgress />;
  }
  if(session){
    return <Outlet/>
  }
  return  <Navigate to="/login" replace />;
};
