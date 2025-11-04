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

---

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

## Backend (API Node/Express)
Interfaz web del proyecto
    
## PostgreSQL
Base de datos relacional

## pgAdmin 4
Interfaz gráfica para PostgreSQL

## MongoDB
Base de datos NoSQL

## Mongo Express
Interfaz gráfica para MongoDB