CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'designer') DEFAULT 'user'
);

-- Insert user dummy
INSERT INTO users (email, nama, password, role) VALUES
('admin@example.com', 'Admin User', 'rahasia', 'admin'),
('user@example.com', 'Normal User', 'rahasia', 'user'),
('designer@example.com', 'Designer User', 'rahasia', 'designer');