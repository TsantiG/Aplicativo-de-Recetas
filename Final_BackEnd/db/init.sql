CREATE TABLE IF NOT EXISTS recetas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    instrucciones TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ingredientes TEXT,
    imagen_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  contrasena password,
  password_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);