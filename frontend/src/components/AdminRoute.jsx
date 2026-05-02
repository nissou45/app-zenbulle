import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to={ROUTES.connexion} />;
  if (user.role !== 'admin') return <Navigate to={ROUTES.dashboard} />;

  return children;
};

export default AdminRoute;
