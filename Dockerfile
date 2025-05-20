# Usa la imagen oficial de Node.js
FROM node:20

# Crea el directorio de la app
WORKDIR /app-franchises

# Copia archivos de definición de dependencias
COPY package.json ./

# Instala dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Expone el puerto que usa Express (ajústalo si usas otro)
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/src/Services/Franchises/infrastructure/HTTP/express/server.js"]