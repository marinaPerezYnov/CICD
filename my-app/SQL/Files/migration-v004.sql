CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Ajoute un admin (mot de passe: admin123)
-- Le mot de passe est hashé avec SHA-256
INSERT INTO admin (email, password) VALUES 
('loise.fenoll@ynov.com', 'PvdrTAzTeR247sDnAZBr');