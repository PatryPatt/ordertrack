# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /usr/src/app

# Evitar problemas de permisos con NPM
RUN mkdir -p /usr/src/app/.npm-cache && npm config set cache /usr/src/app/.npm-cache

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto del backend (3001)
EXPOSE 4000

# Comando de desarrollo NestJS
CMD ["npm", "run", "start:dev"]


