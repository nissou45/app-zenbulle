# ZenBulle 🫧

App de bien-être mental — suivi d'humeur, journal intime, exercices de respiration, citations inspirantes.

## Stack

| Couche | Technologie |
|---|---|
| Frontend | React 19 + Vite, React Router, Tailwind |
| Backend | Node.js / Express 4 |
| Base de données | MySQL 8 (Aiven) |
| Sessions | express-session + MySQLStore |

## Structure

```
app-zenbulle/
├── backend/
│   ├── config/        # Connexion DB (pool MySQL)
│   ├── controllers/   # Logique métier (auth, admin, moods, journal, citations, exercices)
│   ├── middlewares/    # Auth, rôles
│   ├── models/        # Requêtes SQL (user, mood, journal, citations, exercices)
│   └── routes/        # Définition des routes
├── frontend/
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── constants/    # Routes, rôles, émotions, thèmes
│   │   ├── context/      # AuthContext, ThemeContext
│   │   ├── hooks/        # useAuth, useTheme, useBreakpoint
│   │   ├── pages/        # Pages de l'application
│   │   └── services/     # Client API
│   └── ...
└── docker-compose.yml    # Base de données MySQL (dev local)
```
