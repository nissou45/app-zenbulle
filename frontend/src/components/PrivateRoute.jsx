import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants/routes";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-terre font-cormorant italic text-xl">
        Chargement...
      </div>
    );
    
  if (!user) return <Navigate to={ROUTES.connexion} />;

  return children;
};

export default PrivateRoute;
