import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { ROUTES } from "./constants/routes";

// Pages publiques
import SplashScreen from "./pages/SplashScreen";
import Accueil from "./pages/Accueil";
import SelectionTheme from "./pages/SelectionTheme";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Questionnaire from "./pages/Questionnaire";

// Pages protégées
import Dashboard from "./pages/Dashboard";
import Journal from "./pages/Journal";
import MesBulles from "./pages/MesBulles";
import Respiration from "./pages/Respiration";
import EmotionDuJour from "./pages/EmotionDuJour";
import Citations from "./pages/Citations";
import Menu from "./pages/Menu";

const App = () => {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path={ROUTES.splash} element={<SplashScreen />} />
      <Route path={ROUTES.selectionTheme} element={<SelectionTheme />} />
      <Route path={ROUTES.accueil} element={<Accueil />} />
      <Route path={ROUTES.connexion} element={<Connexion />} />
      <Route path={ROUTES.inscription} element={<Inscription />} />
      <Route path={ROUTES.questionnaire} element={<Questionnaire />} />

      {/* Pages protégées */}
      <Route
        path={ROUTES.dashboard}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.journal}
        element={
          <PrivateRoute>
            <Journal />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.mesBulles}
        element={
          <PrivateRoute>
            <MesBulles />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.respiration}
        element={
          <PrivateRoute>
            <Respiration />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.emotion}
        element={
          <PrivateRoute>
            <EmotionDuJour />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.citations}
        element={
          <PrivateRoute>
            <Citations />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.menu}
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
