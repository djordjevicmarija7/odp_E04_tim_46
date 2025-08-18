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
  cena DECIMAL(10,2) NULL,                     -- cena koju unosi majstor
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





INSERT INTO users (korisnickoIme, lozinka, uloga) VALUES
('pera',  '$2a$10$E9y6XG5q7F1c0mZP8n9UOe3z7k1b4d7lY5tVJ9zF7bGxK1N2Q3e4W', 'stanar'),
('mika',  '$2a$10$E9y6XG5q7F1c0mZP8n9UOe3z7k1b4d7lY5tVJ9zF7bGxK1N2Q3e4W', 'majstor'),
('ana',   '$2a$10$E9y6XG5q7F1c0mZP8n9UOe3z7k1b4d7lY5tVJ9zF7bGxK1N2Q3e4W', 'stanar'),
('marko', '$2a$10$E9y6XG5q7F1c0mZP8n9UOe3z7k1b4d7lY5tVJ9zF7bGxK1N2Q3e4W', 'majstor'),
('ivana', '$2a$10$E9y6XG5q7F1c0mZP8n9UOe3z7k1b4d7lY5tVJ9zF7bGxK1N2Q3e4W', 'stanar');

-- Stanar Pera
INSERT INTO reports (userId, naslov, opis, adresa, status) VALUES
(1, 'Pokvaren bojler', 'Bojler ne greje vodu već 3 dana.', 'Bulevar 12', 'Kreiran'),
(1, 'Prozor ne dihtuje', 'Zimi duva hladan vazduh, treba zamena gume.', 'Bulevar 12', 'Popravka u toku');

-- Stanarka Ana
INSERT INTO reports (userId, naslov, opis, adresa, status) VALUES
(3, 'Slavina curi', 'Slavina u kuhinji kaplje stalno.', 'Kneza Miloša 45', 'Saniran'),
(3, 'Pokvaren interfon', 'Ne radi zvono na interfonu, niko ne može da pozvoni.', 'Kneza Miloša 45', 'Kreiran'),
(3, 'Lomljiva vrata od lifta', 'Vrata lifta se teško zatvaraju, može da bude opasno.', 'Kneza Miloša 45', 'Popravka u toku');

-- Stanarka Ivana
INSERT INTO reports (userId, naslov, opis, adresa, status) VALUES
(5, 'Kvar na električnoj instalaciji', 'Nestaje struja u dnevnoj sobi kad se uključi klima.', 'Nemanjina 7', 'Kreiran'),
(5, 'Curenje krova', 'Krov prokišnjava na više mesta tokom kiše.', 'Nemanjina 7', 'Kreiran');

-- Majstor Mika popravio prozor (report 2)
UPDATE reports
SET masterId = 2, masterComment = 'Zamenjena guma, sada dobro dihtuje.', cena = 2500, status = 'Saniran'
WHERE id = 2;

-- Majstor Marko popravio slavinu (report 3)
UPDATE reports
SET masterId = 4, masterComment = 'Zamenjena gumica u ventilu.', cena = 800, status = 'Saniran'
WHERE id = 3;

-- Majstor Mika preuzeo interfon (report 4)
UPDATE reports
SET masterId = 2, masterComment = 'Potrebna zamena celog zvona, delovi poručeni.', cena = 3500, status = 'Popravka u toku'
WHERE id = 4;

INSERT INTO reactions (reportId, userId, reakcija) VALUES
(2, 1, 'like'),
(3, 3, 'like'),
(4, 3, 'neutral');


SELECT id, korisnickoIme, lozinka, uloga FROM users;
UPDATE users
SET lozinka = '$2b$10$7e9X6y2UjCq/3KqYhQfX.uR2vZk3aPpEeU6e8lYzPjM3S7t2j/8Wy'
WHERE korisnickoIme = 'pera';
