# Guía de Onboarding para Nuevos Desarrolladores

Bienvenido/a al proyecto **OrderTrack**   
Este documento explica paso a paso cómo configurar tu entorno local, conocer la estructura del proyecto y empezar a contribuir de forma efectiva.

---

## 1. Acceso al Repositorio

1. Solicita acceso al repositorio principal en GitHub:  
   🔗 [https://github.com/PatryPatt/ordertrack](https://github.com/PatryPatt/ordertrack)

2. Configura tu clave SSH (recomendado) para conectarte a GitHub sin usar contraseñas:  
   📘 [Guía oficial de GitHub](https://docs.github.com/es/authentication/connecting-to-github-with-ssh)

3. Clona el proyecto en tu entorno local:
   ```bash
   git clone git@github.com:PatryPatt/ordertrack.git
   cd ordertrack

## 2. Configurar el entorno local con Docker
1.  Copia el archivo de entorno base:
    cp .env.example .env

2. Revisa las variables en .env y adáptalas si es necesario (puertos, contraseñas, etc.).

3.  Construye y levanta los contenedores:
    docker compose up --build

4.  Verifica que los servicios estén activos:

| Servicio            | URL                                                                  | Puerto | Descripción                        |
| ------------------- | -------------------------------------------------------------------- | ------ | ---------------------------------- |
| **Frontend (Vite)** | [http://localhost:3000](http://localhost:3000)                       | 3000   | Interfaz de usuario React          |
| **Backend (API)**   | [http://localhost:4000/api/health](http://localhost:4000/api/health) | 4000   | API Node/Express                   |
| **pgAdmin**         | [http://localhost:8080](http://localhost:8080)                       | 8080   | Panel de administración PostgreSQL |
| **Mongo Express**   | [http://localhost:8081](http://localhost:8081)                       | 8081   | Panel de administración MongoDB    |

## 3. Flujo de trabajo con Git
1. Crea una nueva rama desde develop para tu tarea:
   git checkout develop
   git pull origin develop
   git checkout -b feature/nueva-funcionalidad
2. Revisa el estado de los archivos:
   git status
3. Añade los cambios:
git add -A
4. Crea un commit siguiendo la convención de Conventional Commits:
   git commit -m "feat(api): añade endpoint de pedidos"

Ejemplos de tipos:

| Tipo        | Descripción                                 |
| ----------- | ------------------------------------------- |
| `feat:`     | Nueva funcionalidad                         |
| `fix:`      | Corrección de errores                       |
| `chore:`    | Tareas internas                             |
| `docs:`     | Cambios en documentación                    |
| `refactor:` | mejora del código sin cambiar funcionalidad | 

1. Sube la rama al repositorio remoto:
   git push origin feature/nueva-funcionalidad
2. Abre un Pull Request hacia la rama develop y solicita revisión.

## 4. Estilo de Código y Validaciones
El proyecto usa Husky, ESLint, Prettier y lint-staged para mantener un código limpio y uniforme.

Antes de cada commit:
- Se ejecutan validaciones automáticas.
- Si hay errores de estilo, el commit se bloquea hasta corregirlos.

Puedes ejecutarlos manualmente con:
npm run lint
npm run format

## 5. Verificación del Entorno
Comprueba que la API responde correctamente:
curl http://localhost:4000/api/health

Y que la interfaz web está disponible en:
http://localhost:3000

## Revisión y Merge

1. Una vez revisado tu Pull Request, otro colaborador lo aprobará.
2. Tras el merge a develop, tu rama se puede eliminar.
3. Los cambios se integrarán en main al preparar un nuevo despliegue.

## 7. Recursos y Referencias

Convenciones de commit https://www.conventionalcommits.org/es/v1.0.0/
Documentación Docker Compose https://docs.docker.com/compose/
Documentación Vite https://vite.dev/
Documentación Express https://expressjs.com/