# Aplicativo-de-Recetas
Front y back(api y base de datos) de aplicativo web para guardar y compartir recetas de cocina.   Utilizando Astro  y Tailwind para el front y TypeScript  para el back ademas de  doker para unirlos (o con visual y mysql).

### Información adicional
- El aplicativo utiliza Cloudinary para todo el tratamiento de imagenes. (esto incluye las que se usan en el front como las que ingresa el usuario)
- Autenticación: La aplicación utiliza JWT para la autenticación.
- la version de node que se utilizo fue: **node:20.13.0**


### **1. Previsualizacion de la web.**
### **2. Configuracion para uzar el aplicativo con Docker.**
### **3. Configuracion para usarlo en visual studio y con base de datos mysql(como por ejemplo el mysql de xamp).**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** (v20 o superior)
- **MySQL** 
- **Docker** (Opcional, si deseas ejecutar el proyecto con contenedores)

1.  --------------------------------------------------------------------------------
**INICIO**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/INICIO.png?raw=true)

**LOGIN**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/LOGIN.png?raw=true)

**SESION INICIADA**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/INICIOSESION.png?raw=true)

**VER RECETAS, CREACION, EDICION Y ELIMINACION**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/VERRECETAS.png?raw=true)

**SELECIONAR RECETAS PARA COMPARTIR Y VER RECETAS QUE YA ESTAN COMPARTIDAS**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/COMPARTIR.png?raw=true)

**VER TODAS LAS RECETAS COMPARTIDAS**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/VERCOMPARTIDAS.png?raw=true)

**VER RECETA YA COMPARTIDA**
![Mi Banner](https://github.com/TsantiG/IMG/blob/main/VERYACOMPARTIDA.png?raw=true)

2. --------------------------------------------------------------------------------
### Variables de entorno
Debes crear un archivo `.env` en la raíz del proyecto de backend (`/backend`) con las siguientes variables de entorno:

---.env
- PORT=3000
- DB_HOST=db
- DB_PORT=3306
- DB_USER=tu_usuario 
- DB_PASSWORD=tu_contraseña
- DB_NAME=recetasdb
- CLOUDINARY_CLOUD_NAME=tu_cloudinary_cloud_name
- CLOUDINARY_API_KEY=tu_cloudinary_api_key
- CLOUDINARY_API_SECRET=tu_cloudinary_api_secret
- JWT_SECRET=tu_secreto_jwt

### Importante:
**La api ya cuenta con un `.env` pero esta orientado para ejecutarse en visual Studio y con mysql de xammp como base de datos, ademas ya cuenta con la union a mi clodinary (la informacion de mi cloudinary se cambiara cuando me califiquen)**

### Comprobacion:
Asegúrate de que tienes configurados los archivos Dockerfile tanto para el frontend como para el backend, ademas del docker-compose.yml ( **una revision rapida** ).

### Iniciar los contenedores:
Desde la raíz del proyecto (donde se encuentra el archivo docker-compose.yml), ejecuta el siguiente comando: docker-compose up --build

### Verificación:
El frontend estará disponible en http://localhost:3001.
El backend estará disponible en http://localhost:3000.


3.  --------------------------------------------------------------------------------------------------------
## configuracion back-end

### Instalacion de dependencias:
Navega a la carpeta del backend en la terminal y copia npm install.


### Configuración de la base de datos:
- Crea la base de datos MySQL utilizando los scripts de SQL proporcionados en el archivo init.sql de la carpeta db en el back(Api).
- Inserta los valores de ejemplo para usuarios, recetas, tipos y regiones tambien encontrados en el mismo archivo.
- comprueba que en el archivo donde se encuentran las variables de entorno el nombre de la base de datos, de usuario y la contraseña sean las que tienes en tu mysql. (si tienes problemas con la conexion a la base de datos, la conexion se encuentra en el archivo **db.ts** en la carpeta **config**) 

### Iniciar el servidor back
- Ejecuta el servidor backend: npm run dev. (El backend debería estar disponible en http://localhost:3000)

## Configuración del Frontend:

### Dependencias
Navega a la carpeta del frontend y Instala las dependencias: npm install

### Iniciar el servidor Front
Inicia el servidor de desarrollo: npm run dev (El frontend deberia estar disponible en http://localhost:4321.)

