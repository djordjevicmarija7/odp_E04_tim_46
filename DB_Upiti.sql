-- Kreiranje baze podataka
CREATE DATABASE IF NOT EXISTS DEFAULT_DB;

-- Koriscenje default baze podataka
USE DEFAULT_DB;

-- Tabela korisnika (samo uloge 'stanar' i 'majstor')
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  korisnickoIme VARCHAR(100) NOT NULL UNIQUE,
  lozinka VARCHAR(255) NOT NULL, -- ovde ide heš lozinke (bcrypt/argon2)
  uloga ENUM('stanar','majstor') NOT NULL DEFAULT 'stanar',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela prijava kvarova (reports)
CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,                          -- autor prijave (stanar)
  naslov VARCHAR(255) NULL,
  opis TEXT NOT NULL,                           -- opis kvara (obavezno)
  imagePath VARCHAR(500) NULL,                  -- putanja/URL do slike (nullable)
  adresa VARCHAR(255) NULL,                     -- adresa stana
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status ENUM('Kreiran','Popravka u toku','Saniran','Problem nije rešen')
    NOT NULL DEFAULT 'Kreiran',
  price DECIMAL(10,2) NULL,                     -- cena koju unosi majstor
  masterComment TEXT NULL,                      -- komentar majstora o radovima
  masterId INT NULL,                            -- majstor koji je prihvatio/odradio (nullable)
  CONSTRAINT fk_reports_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reports_master FOREIGN KEY (masterId) REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabela recenzija/reakcija (stanar ostavlja reakciju na komentar majstora)
CREATE TABLE IF NOT EXISTS reactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reportId INT NOT NULL,
  userId INT NOT NULL,                          -- korisnik koji ostavlja recenziju (stanar)
  reakcija ENUM('like','dislike','neutral') DEFAULT NULL, -- jednostavna reakcija
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reviews_report FOREIGN KEY (reportId) REFERENCES reports(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reviews_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);