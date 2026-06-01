# ZenBulle 🫧

App de bien-être mental — suivi d'humeur, journal intime, exercices de respiration, citations inspirantes.

## Stack technique

| Couche      | Technologie                              |
| ----------- | ---------------------------------------- |
| Frontend    | React 19 + Vite, React Router, Tailwind  |
| Backend     | Node.js / Express 4                      |
| Base données| MySQL 8 (via Docker)                     |
| Sessions    | express-session + MySQLStore             |
| Déploiement | Frontend → Vercel, Backend → Docker      |

## Structure du projet

```
app-zenbulle/
├── backend/          # API Express
│   ├── config/       # Connexion DB
│   ├── controllers/  # Logique métier
│   ├── middlewares/   # Auth, rôles
│   ├── models/       # Requêtes SQL
│   └── routes/       # Définition des routes
├── frontend/         # App React (Vite)
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── constants/    # Routes, rôles, émotions, thèmes
│   │   ├── context/      # AuthContext, ThemeContext
│   │   ├── hooks/        # useAuth, useTheme, useBreakpoint
│   │   ├── pages/        # Pages de l'application
│   │   └── services/     # API client
│   └── ...
└── docker-compose.yml    # Base de données MySQL
```

## Prérequis

- **Node.js** >= 18
- **Docker Desktop** (pour la base de données MySQL)
- **npm** ou **yarn**

## Installation et démarrage

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd app-zenbulle
```

### 2. Lancer la base de données (Docker)

```bash
docker compose up -d
```

La base MySQL sera accessible sur `localhost:3307`.

> ⚠️ Si le port 3307 est déjà utilisé, modifiez-le dans `docker-compose.yml` et le `.env` du backend.

### 3. Configurer les variables d'environnement

```bash
# Backend
cp backend/.env.example backend/.env
# Éditer backend/.env avec vos valeurs
```

```bash
# Frontend
cp frontend/.env.example frontend/.env
```

### 4. Installer les dépendances

```bash
# Backend
cd backend
npm install

# Frontent (dans un autre terminal)
cd frontend
npm install
```

### 5. Démarrer l'application

```bash
# Terminal 1 — Backend (port 3000)
cd backend
npm start

# Terminal 2 — Frontend (port 5173)
cd frontend
npm run dev
```

Ouvrir **http://localhost:5173** dans le navigateur.

## Commandes utiles

```bash
# Backend — mode développement (reload automatique)
cd backend && npm run dev

# Backend — lint
cd backend && npm run lint

# Frontend — build production
cd frontend && npm run build

# Frontend — prévisualisation du build
cd frontend && npm run preview
```

## Variables d'environnement

### Backend (`backend/.env`)

| Variable         | Description                | Valeur par défaut |
| ---------------- | -------------------------- | ----------------- |
| `DB_HOST`        | Hôte MySQL                 | `localhost`       |
| `DB_USER`        | Utilisateur MySQL          | `root`            |
| `DB_PASSWORD`    | Mot de passe MySQL         | `root`            |
| `DB_NAME`        | Nom de la base             | `zenbulle`        |
| `DB_PORT`        | Port MySQL                 | `3307`            |
| `SESSION_SECRET` | Clé secrète des sessions   | _(obligatoire)_   |
| `PORT`           | Port du serveur Express    | `3000`            |
| `NODE_ENV`       | Environnement              | `development`     |

### Frontend (`frontend/.env`)

| Variable       | Description              | Valeur par défaut            |
| -------------- | ------------------------ | ---------------------------- |
| `VITE_API_URL` | URL de l'API backend     | `http://localhost:3000/api`  |

## Scripts SQL

Les tables sont créées automatiquement au premier démarrage de l'application.  
Pour réinitialiser la base, exécutez les scripts dans `database/` :

```bash
docker exec -i app-zenbulle-db mysql -uroot -proot zenbulle < database/schema.sql
```

## Contribuer

1. Forker le projet
2. Créer une branche (`git checkout -b feature/ma-feature`)
3. Commiter (`git commit -m 'Ajout de ma feature'`)
4. Pusher (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

## Licence

Projet étudiant — ISEN Méditerranée
