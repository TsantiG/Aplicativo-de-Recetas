CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS regiones(
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
  FOREIGN KEY (id_region) REFERENCES regiones(id)
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

CREATE TABLE IF NOT EXISTS usuarios_fotos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT,
  url_foto VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);


INSERT INTO regiones(region) VALUES("Colombiana"), ("Mexicana"), ("China"), ("Japonesa"), ("Rusa"), ("India"), ("Estado Unidence"), ("Española"), ("Francesa"), ("Inglesa");

INSERT INTO tipos(tipo) VALUES ("Guisados"), ("Sopas"), ("Ensaladas"), ("Acompañantes"), ("Comida Rapida"), ("Pescado"), ("Pasta");

INSERT INTO usuarios (nombre, correo, password_hash) 
VALUES ("Juan Perez", "juan.perez@example.com", "$2b$10$VfiT/5URtPjX2p5gI0Ex8e/v0G.Zfx29IrvTqPj9BcDUJpfG9nt2a");  -- Asegúrate de generar un hash de contraseña adecuado

INSERT INTO recetas (nombre, descripcion, instrucciones, ingredientes, imagen_url, video_url, id_usuario) 
VALUES 
  ("Sancocho Colombiano", "Sopa tradicional colombiana", "Cocinar los ingredientes hasta que estén suaves", "Yuca, platano, carne, maíz", "https://res.cloudinary.com/dstpvt64c/image/upload/v1726605066/_105055265_bandejapaisa_wpwubo.jpg", NULL, 1),
  ("Tacos Mexicanos", "Tacos con carne asada", "Cocinar la carne y servir con tortillas", "Tortillas, carne, cebolla, cilantro", "https://res.cloudinary.com/dstpvt64c/image/upload/v1726605101/enchiladas-comida-mexicana_izqfdc.jpg", NULL, 1),
  ("Chow Mein", "Fideos chinos salteados", "Saltear los fideos con vegetales", "Fideos, zanahoria, cebolla, pollo", "https://res.cloudinary.com/dstpvt64c/image/upload/v1726605162/chowmein_yjs8co.jpg", NULL, 1),
  ("Sushi Japonés", "Sushi de atún fresco", "Enrollar arroz y pescado en alga nori", "Arroz, pescado, nori", "https://res.cloudinary.com/dstpvt64c/image/upload/v1726605192/sushi-kd4E--624x385_Diario_Vasco-koyH--624x385_Diario_Vasco-kDwG--624x385_Diario_Vasco_d5jhn5.webp", NULL, 1);

INSERT INTO compartirRecetas (id_usuario, id_receta, id_region, id_tipo) 
VALUES 
  (1, 1, 1, 2),  -- Sancocho Colombiano (Colombiana, Sopas)
  (1, 2, 2, 5),  -- Tacos Mexicanos (Mexicana, Comida Rapida)
  (1, 3, 3, 7),  -- Chow Mein (China, Pasta)
  (1, 4, 4, 6);  -- Sushi Japonés (Japonesa, Pescado)
