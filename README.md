# ordertrack

Proyecto de ejemplo con los siguientes contenedores:
- Frontend (React/Vite) → http://localhost:3000/api
- Backend (API)         → http://localhost:4000/api/health
- pgAdmin               → http://localhost:5050
- Mongo Express         → http://localhost:8081

## Entorno local Docker

#### Servicios disponibles

| Servicio            | URL local                        | Puerto  | Usuario / Email       | Contraseña  |
|---------------------|----------------------------------|---------|-----------------------|-------------|
| **Frontend (Vite)** | http://localhost:3000/api        | 3000    | -                     | -           |
| **Backend (API)**   | http://localhost:4000/api/health | 4000    | -                     | -           |
| **pgAdmin**         | http://localhost:5050            | 5050    | admin@local.com       | admin       |
| **Mongo Express**   | http://localhost:8081            | 8081    | root                  | root123     |
| **PostgreSQL**      | localhost:5432                   | 5432    | user                  | password    |
| **MongoDB**         | localhost:27017                  | 27017   | root                  | root123     |

#### Iniciar los servicios, levantar entorno
docker compose up --build

#### Mostrar contenedores en ejecución 
docker ps

#### Detener los servicios en ejecución
docker compose down

#### Detener y limpiar volúmenes
docker compose down -v

## gitHub

#### Estado del directorio de trabajo
git status

#### Crear nueva rama
git checkout -b <nombre-rama>

#### Añadir todos los archivos al directorio
git add -A

#### Confirmar cambios con mensaje
git commit -m "feat(setup): descripcion"

#### subir cambios al repositorio remoto
git push origin <nombre-rama>

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