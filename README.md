# ordertrack

**OrderTrack** es un proyecto fullstack de ejemplo que integra un backend en **Node.js/Express**, un frontend en **React/Vite**, y bases de datos **PostgreSQL** y **MongoDB**, todo orquestado con **Docker Compose**.

Su objetivo es proporcionar una base sólida para entornos de desarrollo modernos con múltiples servicios, bases de datos y flujos DevOps simples.

Proyecto de ejemplo con los siguientes contenedores:
- Frontend (React/Vite) → http://localhost:3000/api
- Backend (API)         → http://localhost:4000/api/health
- pgAdmin               → http://localhost:5050
- Mongo Express         → http://localhost:8081

---

## Estructura del proyecto

| Servicio            | Descripción                             | URL local                        | Puerto  | Usuario / Email       | Contraseña  |
|---------------------|------------------------------------------|----------------------------------|---------|-----------------------|-------------|
| **Frontend (Vite)** | Interfaz de usuario React/Vite           | http://localhost:3000/api        | 3000    | -                     | -           |
| **Backend (API)**   | API REST con Node.js y Express           | http://localhost:4000/api/health | 4000    | -                     | -           |
| **pgAdmin**         | Interfaz gráfica para PostgreSQL         | http://localhost:5050            | 5050    | admin@local.com       | admin       |
| **Mongo Express**   | Interfaz gráfica para MongoDB            | http://localhost:8081            | 8081    | root                  | root123     |
| **PostgreSQL**      | Base de datos relacional                 | localhost:5432                   | 5432    | user                  | password    |
| **MongoDB**         | Base de datos NoSQL                      | localhost:27017                  | 27017   | root                  | root123     |
| **Swagger**         |Documentación Swagger                     | http://localhost:4000/api/docs   | 4000    |                       |             |

---

- Vite en el puerto 3000
- NestJS (API) en el 4000
- Servicios de bases de datos y administración funcionando correctamente
- Swagger activo y accesible

## Levantar el entorno local Docker

#### 1- Requisitos previos
- Docker y Docker Compose instalados
- Puertos `4000`, `5173`, `8080`, `8081`, `5432` y `27017` disponibles

#### 2- Variables de entorno

El proyecto utiliza un archivo `.env` en la raíz.

### Comandos básicos Docker

#### Iniciar los servicios, levantar entorno
docker compose up -d --build

#### Mostrar contenedores activos 
docker ps

#### Detener los servicios en ejecución
docker compose down

#### Detener y limpiar volúmenes
docker compose down -v

---

 ## Estructura de carpetas

 ordertrack/
│
├── backend/         # API Express + Node.js
├── frontend/        # Aplicación React/Vite
├── docker-compose.yml
├── .env
├── .env.example
└── README.md

---

## Convenciones de gitHub y ramas

### Ramas principales
- main → código estable y listo para producción.
- develop → rama base para el desarrollo activo.
- feature/ → ramas de nuevas funcionalidades o mejoras.

### Convenciones de commits (Conventional Commits)
Usamos el formato estándar para mantener un historial limpio y semántico:
<tipo>(<área>): <descripción>

Tipos mas comúnes:

| Tipo        | Descripción                            |
| ----------- | -------------------------------------- |
| `feat:`     | Nueva funcionalidad                    |
| `fix:`      | Corrección de errores                  |
| `docs:`     | Cambios en documentación               |
| `style:`    | Cambios de formato o estilo sin lógica |
| `refactor:` | Mejora de código sin cambio funcional  |
| `test:`     | Añadir o corregir tests                |
| `chore:`    | Tareas varias o mantenimiento          |

Ejemplo:
git commit -m "feat(api): add user registration endpoint"

### Comandos Git útiles

#### Estado del directorio de trabajo
git status

#### Crear nueva rama
git checkout -b feature/<nombre-rama>

#### Añadir todos los archivos al directorio
git add -A

#### Confirmar cambios con mensaje
git commit -m "feat(setup): descripcion"

#### subir cambios al repositorio remoto
git push origin feature/<nombre-rama>

---

## Tecnologías utilizadas

- Node.js / Express → Backend REST API
- React / Vite → Frontend SPA
- PostgreSQL / pgAdmin → Base de datos relacional
- MongoDB / Mongo Express → Base de datos NoSQL
- Docker Compose → Orquestación de contenedores
- ESLint / Prettier / Husky → Control de calidad y hooks de Git

Según nuestra estructura actual:
ordertrack/
├── backend/       # API Express (Node.js)
├── frontend/      # React/Vite
├── docker-compose.yml
├── .env
├── .env.example
└── README.md

**Vamos a tener un package.json para backend/ y otro en frontend/.**
1. Cada parte tiene dependencias distintas
- El backend usa cosas como express, dotenv, pg, mongoose, etc.
- El frontend usa react, vite, eslint-plugin-react, etc.
Si los mezclamos en la raíz, se complicaría la gestión y las instalaciones.

2. Mantiene independencia
Puedes levantar, testear o desplegar solo el frontend o solo el backend.

3. Evita conflictos de versiones
eslint, typescript, o prettier pueden requerir versiones distintas según el entorno.

4. Se adapta perfectamente al entorno Dockerizado
Cada servicio (api y web) se construye por separado con su propio npm install.

| Ubicación de `package.json` | Recomendado | Cuándo usarlo                                    |
| --------------------------- | ----------- | ------------------------------------------------ |
| `frontend/`                 | ✅ Sí        | Dependencias y scripts del cliente React/Vite    |
| `backend/`                  | ✅ Sí        | Dependencias y scripts del servidor Node/Express |

**El flujo normal de trabajo será:**
1. Editas código.
2. Ejecutas npm run lint para detectar estilo o errores.
3. Ejecutas npm run lint:fix o npm run format para corregirlos automáticamente.
4. Pre-commit (Husky + lint-staged) ya los aplicará antes de cada commit.

## Frontend (React/Vite)
Interfaz web del proyecto

## API — Backend (NestJS)
Este backend está desarrollado con **[NestJS 11](https://nestjs.com/)** y forma parte del proyecto **OrderTrack**.  
Actualmente implementa la estructura base del framework, validaciones globales, documentación con Swagger y pruebas unitarias funcionales.

---

## Características principales

- **Framework:** NestJS (Node.js + TypeScript)  
- **Arquitectura modular:** App, Users y Health  
- **Validaciones:** `class-validator` + `ValidationPipe` global  
- **Configuración:** Variables de entorno mediante `@nestjs/config`  
- **Documentación API:** Swagger disponible en `/api/docs`  
- **Pruebas unitarias:** Configuradas con Jest  
- **Contenedores:** Docker Compose con PostgreSQL, MongoDB, pgAdmin y Mongo Express  

---

## Estructura del proyecto
src/
├── app.module.ts # Módulo raíz
├── app.controller.ts # Controlador principal (Hello World)
├── app.service.ts # Servicio principal
├── main.ts # Punto de entrada, configuración global y Swagger
├── users/ # Módulo de usuarios (DTOs, controlador, servicio)
└── health/ # Módulo de health check

## Endpoints principales

| Ruta | Método | Descripción |
|------|---------|-------------|
| `/` | GET | Endpoint base (“Hello World”) |
| `/api/health` | GET | Verifica el estado del backend |
| `/api/docs` | — | Documentación Swagger de la API |
| `/users` | CRUD | Endpoints del módulo de usuarios |

---

## Estado actual

-  Estructura NestJS inicial completada  
-  Validaciones globales con `class-validator`  
-  Swagger configurado correctamente  
-  Tests unitarios en verde  
-  Entorno Docker operativo  

---

### Instrucciones para levantar backend
1. Crear un nuevo proyecto NestJS desde cero, generando toda la estructura inicial y configuración necesaria.
**nest new backend**

| Acción                                                  | Descripción                                               |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `nest new backend`                                      | Crea una nueva aplicación NestJS en la carpeta `backend/` |
| Configura TypeScript, ESLint y Prettier automáticamente |                                                           |
| Te deja listo para empezar a desarrollar tu API modular |                                                           |

## Scripts disponibles

| Comando                     | Descripción |
|-----------------------------|-------------|
| `npm run start:dev`         | Inicia el servidor en modo desarrollo (reinicia al guardar cambios) |
| `npm run lint`              | Ejecuta ESLint para comprobar el estilo de código |
| `npm run test`              | Ejecuta las pruebas unitarias con Jest |
| `docker compose up --build` | Levanta el entorno completo (API, bases de datos y GUI) |
| `npm run start`             | Inicia el servidor |
| `npm run build`             | Compila TypeScript a JavaScript |

## Módulo test
Para ejecutarlos desde dentro de Docker
  docker compose exec api npm run test

Desde fuera del contenedor:
  npm run test

RESULTADO ESPERADO

 PASS  src/app.controller.spec.ts
 PASS  src/health/health.controller.spec.ts
 PASS  src/health/health.service.spec.ts
 PASS  src/users/users.service.spec.ts
 PASS  src/users/users.controller.spec.ts

Test Suites: 5 passed, 5 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        1.071 s

| Funcionalidad              | Test                                                 | Resultado esperado                                            |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Crear usuario              | `should create a user`                             | Devuelve un objeto con `id`, `username`, `email`, `password`. |
| Buscar usuario existente   | `should find a user by ID`                         | Devuelve el mismo objeto creado.                              |
| Buscar usuario inexistente | `should throw NotFoundException if user not found` | Lanza una excepción.                                          |
| Actualizar usuario         | `should update a user`                             | Cambia correctamente el `username`.                           |
| Eliminar usuario           | `should remove a user`                             | Después de borrar, lanza excepción al buscar.                 |

Se pueden ejecutar test con cobertura, para ver que partes de código están cubiertas.
Ejecutamos:
  docker compose exec api npm run test:cov

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              |    61.6 |    68.18 |   57.89 |   59.34 |                   
 src                   |   36.11 |       50 |      75 |      30 |                   
  app.controller.ts    |     100 |       75 |     100 |     100 | 6                 
  app.module.ts        |       0 |      100 |     100 |       0 | 1-19              
  app.service.ts       |     100 |      100 |     100 |     100 |                   
  main.ts              |       0 |        0 |       0 |       0 | 1-39              
 src/health            |   56.25 |      100 |       0 |      50 |                   
  health.controller.ts |   83.33 |      100 |       0 |      75 | 7                 
  health.module.ts     |       0 |      100 |     100 |       0 | 1-9               
  health.service.ts    |     100 |      100 |     100 |     100 |                   
 src/users             |      75 |       75 |   57.14 |   74.35 |                   
  users.controller.ts  |   73.68 |       75 |   16.66 |   70.58 | 23,29,35,41,47    
  users.module.ts      |       0 |      100 |     100 |       0 | 1-9               
  users.service.ts     |   95.65 |       75 |    87.5 |   94.44 | 21                
 src/users/dto         |     100 |      100 |     100 |     100 |                   
  create-user.dto.ts   |     100 |      100 |     100 |     100 |                   
  update-user.dto.ts   |     100 |      100 |     100 |     100 |                   
 src/users/entities    |       0 |      100 |     100 |       0 |                   
  user.entity.ts       |       0 |      100 |     100 |       0 | 1                 
-----------------------|---------|----------|---------|---------|-------------------

## script test:watch
Tiene que estar declarado en el package.json en el bloque scripts:
Usamos --watchAll porque no tenemos un repositorio Git/Hg dentro del contenedor.

"scripts": {
  "test:watch": "jest --watchAll"
}

Lo que hace, es que le dice a Jest que observe todos los archivos y ejecute las pruebas cada vez que haya un cambio, sin depender de Git.

Para ejecutarlo:
  docker compose exec api npm run test:watch

Cada vez que se edite cualquier archivo .ts dentro de src/, las pruebas se ejecutarán automáticamente dentro del contenedor.
Veremos que Jest se queda escuchando los cambios sin errores:

 PASS  src/app.controller.spec.ts
 PASS  src/health/health.service.spec.ts
 PASS  src/users/users.controller.spec.ts
 PASS  src/users/users.service.spec.ts
 PASS  src/health/health.controller.spec.ts

Test Suites: 5 passed, 5 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.948 s, estimated 1 s
Ran all test suites.

Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

## Módulo Users
El módulo Users implementa un CRUD completo en memoria para gestionar usuarios.
Sigue el flujo típico de NestJS: Controller → Service → DTOs → Entity, y expone endpoints REST documentados con Swagger.

### Crear módulo users con CRUD en memoria.

1. Ejecutamos → **nest g resource users**
? What transport layer do you use? (Use arrow keys)
❯ REST API
  GraphQL (code first)
  GraphQL (schema first)
  Microservice (non-HTTP)
  WebSockets
? Would you like to generate CRUD entry points? (Y/n) Y

2. Se generará la siguiente estructura:
esto registrará automáticamente UsersModule dentro de AppModule.

src/users/
 ├── dto/
 │   ├── create-user.dto.ts
 │   └── update-user.dto.ts
 ├── entities/
 │   └── user.entity.ts
 ├── users.controller.ts
 ├── users.module.ts
 └── users.service.ts

3. Iniciar el servidor
npm run start:dev

4. Flujo de funcionamiento
- Controller (users.controller.ts) → Define los endpoints REST.
- Service (users.service.ts) → Contiene la lógica de negocio y manipula un array en memoria.
- DTOs (create-user.dto.ts, update-user.dto.ts) → Validan los datos de entrada usando class-validator.
- Entity (user.entity.ts) → Define la estructura básica del usuario.

5. Probar endpoints con Postman o Thunder Client:

| Método   | Endpoint     | Descripción                  | Body ejemplo                                              |
| -------- | ------------ | ---------------------------- | --------------------------------------------------------- |
| `POST`   | `/users`     | Crea un nuevo usuario        | `{ "name": "Patricia", "email": "patricia@example.com", "password": "123456" }` |
| `GET`    | `/users`     | Devuelve todos los usuarios  | —                                                         |
| `GET`    | `/users/:id` | Devuelve un usuario por ID   | —                                                         |
| `PATCH`  | `/users/:id` | Actualiza un usuario         | `{ "name": "Patricia Updated" }`                          |
| `DELETE` | `/users/:id` | Elimina un usuario por ID    | —                                                         |

Con esto tenemos un CRUD completo funcionando en memoria, sin base de datos, ideal para prototipos o tests iniciales.
Cada vez que se reinicie el servidor, los datos se perderán (ya que están en memoria).

### Validación de endpoints con Thunder Client

Sigue estos pasos para verificar el funcionamiento del módulo Users en tu API NestJS.

🔹 1. Iniciar el backend
    Asegúrate de tener el servidor corriendo:
    npm run start:dev
    Por defecto se ejecuta en http://localhost:4000

🔹 2. Abrir Thunder Client

En Visual Studio Code:
    Abre la pestaña Thunder Client (icono de rayo ⚡).
    Crea una colección nueva llamada Users API (opcional).

🔹 3. Endpoints disponibles
| Método     | Ruta         | Descripción                    | Ejemplo de cuerpo (JSON)                                                            |
| :--------- | :----------- | :----------------------------- | :---------------------------------------------------------------------------------- |
| **GET**    | `/users`     | Devuelve todos los usuarios    | —                                                                                   |
| **GET**    | `/users/:id` | Devuelve un usuario por ID     | —                                                                                   |
| **POST**   | `/users`     | Crea un nuevo usuario          | `{ "username": "patricia", "email": "patricia@example.com", "password": "123456" }` |
| **PATCH**  | `/users/:id` | Actualiza un usuario existente | `{ "email": "nuevo@email.com" }`                                                    |
| **DELETE** | `/users/:id` | Elimina un usuario por ID      | —                                                                                   |

🔹 4. Ejemplos de prueba
  GET /users
    URL: http://localhost:4000/users
    Respuesta esperada:
    []


### Configurar SwaggerModule y DTOs con class-validator.

1. Instalar y configurar Swagger para tener la documentación interactiva (/api).
En backend/, ejecutar:
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer

Estas librerías sirven para:
- @nestjs/swagger → genera la documentación OpenAPI.
- swagger-ui-express → monta la interfaz visual de Swagger.
- class-validator + class-transformer → validan y transforman datos en los DTOs.

2. Crear DTOs usando class-validator y class-transformer para validar los datos de entrada.
3. Integrarlo con el módulo users.

Una vez que esté levantado el servidor (npm run start:dev), deberíamos ver:
- API corriendo: http://localhost:4000
- Documentación Swagger: http://localhost:4000/api/docs Swagger ya permite probar los endpoints directamente en el navegador.
Si hacemos un POST /users con datos inválidos, class-validator los bloqueará automáticamente.

Verificar que NestJS esta levantado:
npm run start:dev

Por consola deberiamos ver:
🚀 App running on http://localhost:4000
📘 Swagger Docs on http://localhost:4000/api/docs

## PostgreSQL
Base de datos relacional

## pgAdmin 4
Interfaz gráfica para PostgreSQL

## MongoDB
Base de datos NoSQL

## Mongo Express
Interfaz gráfica para MongoDB