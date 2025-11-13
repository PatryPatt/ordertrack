# 1. Imagen base Node
FROM node:20

# 2. Directorio de trabajo
WORKDIR /usr/src/app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar todo el código fuente
COPY . .

# 6. Exponer puerto
EXPOSE 3000

# 7. Comando para desarrollo
CMD ["npm", "run", "dev"]

