import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";
import { ROLES } from "../constants/roles";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to={ROUTES.connexion} />;
  if (user.role !== ROLES.ADMIN) return <Navigate to={ROUTES.dashboard} />;

  return children;
};

export default AdminRoute;
