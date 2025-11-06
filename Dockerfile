# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /usr/src/app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto del backend (3001)
EXPOSE 3001

# Comando de desarrollo NestJS
CMD ["npm", "run", "start:dev"]
