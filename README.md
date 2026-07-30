# Sistema de Gestión de Incidentes - Help Desk
**Actividad 8 y 9 - Desarrollo de Sistemas Informáticos**

Universidad Técnica de Manabí

## Resumen del stack
- Backend: Java + Spring Boot (ubicado en `actividad8-api/`)
- Base de datos: PostgreSQL (configurable vía variables de entorno)
- Frontend: React (ubicado en `frontend/`)
- API: RESTful en `/api/*` con operaciones CRUD para tickets

> Nota: el repositorio contiene un backend Java (Spring Boot). Ignora referencias antiguas a Node.js/Express en versiones previas del README.

---

## Requisitos locales
- JDK 17+
- Node.js 16+ y npm
- PostgreSQL (local o remoto)

## Variables de entorno importantes
Backend (usarse al ejecutar o configurar el servicio en la nube):
- SPRING_DATASOURCE_URL (ej: `jdbc:postgresql://host:5432/helpdesk`)
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- PORT (opcional, default 8080)
- FRONTEND_URL (origen permitido para CORS, por defecto `http://localhost:3000`)

Frontend:
- REACT_APP_API_URL (ej: `https://mi-backend.example.com/api`) — si no está, el frontend usará `http://localhost:8080/api`.

## Ejecutar backend (Spring Boot)
1. Configura la base de datos PostgreSQL y crea la base `helpdesk` o ajusta la URL.
2. Desde la carpeta `actividad8-api`:

Linux/macOS (ejemplo):

```bash
cd actividad8-api
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/helpdesk \
SPRING_DATASOURCE_USERNAME=postgres \
SPRING_DATASOURCE_PASSWORD=tu_password \
FRONTEND_URL=http://localhost:3000 \
./mvnw spring-boot:run
```

O construir y ejecutar JAR:

```bash
./mvnw clean package
java -jar target/*.jar
```

## Ejecutar frontend (React)
```bash
cd frontend
npm install
# Ejecutar en desarrollo (definir la URL del backend):
REACT_APP_API_URL=http://localhost:8080/api npm start
# Para producción:
npm run build
```

## Desplegar frontend en Vercel
1. Crea un proyecto en Vercel y conecta tu repositorio GitHub.
2. En el campo "Root Directory" selecciona `frontend` (importante: el proyecto React está dentro de esta carpeta).
3. En "Framework Preset" Vercel suele detectar Create React App; si no, selecciona "Create React App".
4. En "Environment Variables" agrega `REACT_APP_API_URL` con la URL pública de tu backend (ej: `https://mi-backend.example.com/api`).
5. Deploy. Vercel ejecutará `npm run build` y servirá la carpeta `build`.

> He añadido `frontend/vercel.json` que configura la build para Vercel y enrutamiento SPA.

## Endpoints principales (backend)
- GET  /api/tickets         -> listar tickets
- POST /api/tickets         -> crear ticket
- PUT  /api/tickets/{id}    -> actualizar ticket
- DELETE /api/tickets/{id}  -> eliminar ticket

## Buenas prácticas ya aplicadas
- Validación en backend con anotaciones (`@NotBlank`, `@Valid`).
- Sanitización en frontend con DOMPurify (evitar XSS cuando se renderiza HTML).
- Configuración via variables de entorno para despliegue en la nube.

## Siguientes pasos recomendados
- Añadir tests de integración para el backend y tests E2E para el flujo frontend.
- Ajustar roles/usuarios y autenticación si se requiere control de accesos.
- Documentar despliegue en Render/Railway (backend) y Vercel/Netlify (frontend).

