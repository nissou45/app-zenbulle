import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

// Pages publiques
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";

// Pages protégées
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import MesBulles from "./pages/MesBulles";
import Respiration from "./pages/Respiration";
import EmotionDuJour from "./pages/EmotionDuJour";
import Citations from "./pages/Citations";
import Menu from "./pages/Menu";
import Questionnaire from "./pages/Questionnaire";
const App = () => {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/" element={<Accueil />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/questionnaire" element={<Questionnaire />} />

      {/* Pages protégées */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/journal"
        element={
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        }
      />
      <Route
        path="/mes-bulles"
        element={
          <PrivateRoute>
            <MesBulles />
          </PrivateRoute>
        }
      />
      <Route
        path="/respiration"
        element={
          <PrivateRoute>
            <Respiration />
          </PrivateRoute>
        }
      />
      <Route
        path="/emotion"
        element={
          <PrivateRoute>
            <EmotionDuJour />
          </PrivateRoute>
        }
      />
      <Route
        path="/citations"
        element={
          <PrivateRoute>
            <Citations />
          </PrivateRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
