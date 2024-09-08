CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS region(
  id INT AUTO_INCREMENT PRIMARY KEY,
  region VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS tipos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS recetas(
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  instrucciones TEXT,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ingredientes TEXT,
  imagen_url VARCHAR(255),
  video_url VARCHAR(255),
  id_usuario INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE 
);


CREATE TABLE IF NOT EXISTS compartirRecetas(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fechasubida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_usuario INT,
  id_receta INT,
  id_region INT,
  id_tipo INT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_tipo) REFERENCES tipos(id),
  FOREIGN KEY (id_region) REFERENCES region(id)
);

CREATE TABLE IF NOT EXISTS comentarReceta(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  id_receta INT,
  comentario TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS calificarReceta(
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  id_receta INT,
  calificacion TINYINT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (id_receta) REFERENCES recetas(id) ON DELETE CASCADE
);

INSERT INTO regiones(region) VALUES("Colombiana"), ("Mexicana"), ("China"), ("Japonesa"), ("Rusa"), ("India"), ("Estado Unidence"), ("Española"), ("Francesa"), ("Inglesa");

INSERT INTO tipos(tipo) VALUES ("Guisados"), ("Sopas"), ("Ensaladas"), ("Acompañantes"), ("Comida Rapida"), ("Pescado"), ("Pasta");
