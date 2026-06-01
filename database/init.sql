CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `moods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO `moods` (`id`, `label`) VALUES
(1, 'joie'),
(2, 'calme'),
(3, 'triste'),
(4, 'anxieux'),
(5, 'fatigue');

CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `daily_moods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `mood_id` int NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  KEY `mood_id` (`mood_id`),
  CONSTRAINT `daily_moods_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`),
  CONSTRAINT `daily_moods_ibfk_2` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `journal_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  CONSTRAINT `journal_entries_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `citations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mood` varchar(50) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT IGNORE INTO `citations` (`mood`, `text`) VALUES
('joie', 'Le bonheur est un choix que l''on renouvelle chaque matin.'),
('joie', 'La joie est la forme la plus simple de gratitude.'),
('joie', 'Souris au monde et le monde te sourira.'),
('joie', 'Chaque jour est une nouvelle chance de briller.'),
('joie', 'La vie est belle quand on choisit de voir le positif.'),
('calme', 'La paix intérieure commence par un souffle.'),
('calme', 'Dans le silence, on trouve les réponses.'),
('calme', 'Prends le temps de respirer, tout va bien.'),
('calme', 'La sérénité n''est pas l''absence de bruit, mais la paix intérieure.'),
('calme', 'Rien ne presse, tout est à sa place.'),
('triste', 'Il est normal de ne pas aller bien. Sois doux avec toi-même.'),
('triste', 'Les nuages aussi finissent par partir.'),
('triste', 'Prends soin de ton cœur, il guérira.'),
('triste', 'Chaque larme est une plume qui s''envole.'),
('triste', 'Même les jours sombres mènent à des nuits étoilées.'),
('anxieux', 'Tu n''es pas seul. Tu es en sécurité. Tout va bien.'),
('anxieux', 'Ramenons doucement ton esprit vers le calme.'),
('anxieux', 'L''anxiété est une vague. Elle monte, mais elle finit toujours par descendre.'),
('anxieux', 'Ancre-toi dans l''instant présent.'),
('anxieux', 'Tu as surmonté toutes tes difficultés jusqu''ici.'),
('fatigue', 'Repose-toi, tu n''as rien à prouver à personne.'),
('fatigue', 'Se reposer n''est pas abandonner, c''est se préparer.'),
('fatigue', 'Prends soin de toi comme tu prendrais soin de quelqu''un que tu aimes.'),
('fatigue', 'La fatigue est un message de ton corps. Écoute-le.');

CREATE TABLE IF NOT EXISTS `exercices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `description` text,
  `duree_inspire` int DEFAULT NULL,
  `duree_bloque` int DEFAULT NULL,
  `duree_expire` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;