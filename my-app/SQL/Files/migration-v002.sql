use ynov_ci;
-- CREATE TABLE utilisateur
-- (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     nom VARCHAR(100),
--     prenom VARCHAR(100),
--     email VARCHAR(255),
--     date_naissance VARCHAR(255),
--     -- date_naissance DATE,
--     pays VARCHAR(255),
--     ville VARCHAR(255),
--     code_postal VARCHAR(5),
--     nombre_achat INT
-- );
CREATE TABLE utilisateur
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(100) DEFAULT NULL,
    prenom VARCHAR(100) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    date_naissance VARCHAR(255) DEFAULT NULL,
    -- date_naissance DATE DEFAULT NULL,
    pays VARCHAR(255) DEFAULT NULL,
    ville VARCHAR(255) DEFAULT NULL,
    code_postal VARCHAR(5) DEFAULT NULL,
    nombre_achat INT DEFAULT NULL
);