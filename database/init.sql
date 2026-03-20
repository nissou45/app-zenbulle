CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pseudo VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS moods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

INSERT INTO moods (label) VALUES
('joie'), ('calme'), ('triste'), ('anxieux'), ('fatigue');

CREATE TABLE IF NOT EXISTS daily_moods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  mood_id INT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (mood_id) REFERENCES moods(id)
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  content TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE IF NOT EXISTS exercices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  duree_inspire INT,
  duree_bloque INT,
  duree_expire INT
);

INSERT INTO exercices (nom, description, duree_inspire, duree_bloque, duree_expire) VALUES
('Cohérence cardiaque', 'Respiration pour calmer le système nerveux', 4, 0, 6),
('Box breathing', 'Technique utilisée par les Navy SEALs', 4, 4, 4),
('Relaxation profonde', 'Pour s endormir plus facilement', 4, 7, 8);