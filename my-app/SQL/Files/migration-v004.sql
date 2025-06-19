CREATE TABLE IF NOT EXISTS admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO admin (email, password) VALUES 
('loise.fenoll@ynov.com', 'PvdrTAzTeR247sDnAZBr');