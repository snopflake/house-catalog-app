USE house_catalog;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  nama VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user', 'designer') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS designs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  design_name VARCHAR(100) NOT NULL,
  design_country VARCHAR(100) NOT NULL,
  design_specialty VARCHAR(100) NOT NULL,
  created_by VARCHAR(100) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  verified TINYINT(1) NOT NULL DEFAULT 0
);