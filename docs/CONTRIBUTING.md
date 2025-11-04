# Guía de Contribución

¡Gracias por tu interés en contribuir a **OrderTrack**!  
Este documento explica cómo colaborar correctamente en el proyecto, las normas de estilo, y el flujo de trabajo con Git.

---

## Requisitos previos

Antes de empezar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (versión 20 o superior)
- [npm](https://www.npmjs.com/)
- Git configurado con tu usuario y clave SSH (si usas GitHub)

---

## Configuración inicial del entorno

1. **Clona el repositorio**

   ```bash
   git clone git@github.com:PatryPatt/ordertrack.git
   cd ordertrack

2. **Copia el archivo .env.example y crea tu entorno local**
   
   cp .env.example .env

3. **Levanta contenedores**
   
   docker compose up --build

4. **Verifica que los servicios estén corriendo correctamente**
   
- Frontend → http://localhost:5173
- API → http://localhost:4000/api/health
- pgAdmin → http://localhost:8080
- Mongo Express → http://localhost:8081
   
## Flujo de trabajo con Git

Este proyecto utiliza un flujo basado en Git Flow simplificado.

#### Ramas principales

- main: contiene el código estable y listo para producción.
- develop: rama de integración para el desarrollo activo.

##### Ramas de trabajo

Para nuevas funcionalidades, correcciones o mejoras, crea una rama a partir de develop:

git checkout develop
git pull origin develop
git checkout -b feature/<nombre-rama>

**Ejemplos:**

feature/auth-system
fix/login-bug
chore/update-dependencies

## Convenciones de commits
Usamos el estándar Conventional Commits:
    <tipo>(<área>): <mensaje corto y claro>

Tipos válidos:

| Tipo        | Descripción                             |
| ----------- | --------------------------------------- |
| `feat:`     | Nueva funcionalidad                     |
| `fix:`      | Corrección de errores                   |
| `docs:`     | Cambios en documentación                |
| `style:`    | Cambios de formato o estilo sin lógica  |
| `refactor:` | Refactorización de código               |
| `test:`     | Añadir o actualizar pruebas             |
| `chore:`    | Tareas de mantenimiento o configuración |

Ejemplo:
git commit -m "feat(api): add user registration endpoint"

## Estilo de código y validaciones

Este proyecto utiliza ESLint, Prettier y Husky para asegurar la calidad del código.

Antes de hacer commit, se ejecutan automáticamente las verificaciones de estilo mediante lint-staged.

Puedes ejecutar las comprobaciones manualmente con:
npm run lint
npm run format

## Pull Request
Cuando hayas terminado tus cambios:

**1- Asegúrate de tener los últimos cambios:**
git pull origin develop

**2- Verifica que los tests y linter pasen correctamente.**

**3- Crea un Pull Request (PR) hacia la rama develop desde tu rama feature/*.**
En el PR incluye:
    - Descripción breve de los cambios
    - Justificación del cambio (por qué es necesario)
    - Capturas de pantalla si aplica
  
**4- Espera la revisión y aprobación antes de hacer merge.**

## Normas generales de contribución

✅ Mantén un código limpio, legible y comentado.
✅ Sigue las convenciones de estilo establecidas.
✅ Incluye tests o comprobaciones básicas si el cambio lo requiere.
✅ No subas datos sensibles (contraseñas, tokens, etc.).
✅ Evita commits genéricos como “fix” o “update code”.

**Ejemplo:**

---

##### Crear nueva rama
git checkout -b feature/add-product-endpoint

##### Realizar cambios y verificar formato
npm run lint
npm run format

##### Hacer commit siguiendo la convención
git add .
git commit -m "feat(api): add new product endpoint"

##### Subir la rama
git push origin feature/add-product-endpoint

##### Crear Pull Request hacia develop

---

## Soporte
Si encuentras algún problema o bug, por favor abre un issue en GitHub https://github.com/PatryPatt/ordertrack/issues con una descripción clara y los pasos para reproducirlo.

¡Gracias por contribuir a OrderTrack! Tu participación ayuda a mejorar el proyecto y mantener un entorno de desarrollo colaborativo.