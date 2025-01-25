# Library Management System

This project consists of a library management system with the following components:

- **Server**: The backend API that interacts with the database and serves the application data.
- **Web**: The frontend application built with Next.js, interacting with the backend API.
- **Docker Compose**: Manages multi-container Docker applications, running the `server`, `web`, and `postgres-db` containers.

## Project Structure

- `server/`: Backend API built with Node.js/Express (or similar).
- `web/`: Frontend built with Next.js.
- `docker-compose.yml`: Configures all services to run together with Docker.

## Prerequisites

Before running the project, make sure you have the following installed:

- Docker
- Docker Compose

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Build Docker Containers
	The project is configured using Docker Compose to manage all services. To build the containers for all services (web, server, and postgres-db), use the following command:

```bash
docker-compose build
```

### 3. Start Services
	To start all services (web, server, and PostgreSQL database), run the following command:

```bash
docker-compose up
```

	This will:

	Start the server on port 3010.
	Start the web on port 3000.
	Start PostgreSQL on port 5432 for database operations.

### 4. Access the Application
	Frontend (Web): Access the application by navigating to http://localhost:3000 in your browser.
	Backend (API): The API is accessible at http://localhost:3010.

### 5. Stop Services
	To stop all services, use:

```bash
docker-compose down
```

### Docker Compose Configuration
	The docker-compose.yml file defines the following services:

	web (Frontend)
	Build Context: The web service is built from the ./web folder.
	Port Mapping: Exposes the frontend on port 3000.

### Environment Variables:
- **API_URL**: Set to http://server:3010 to point to the backend service.
	Dependencies: Depends on the server service.
	server (Backend)
	Build Context: The server service is built from the ./server folder.
	Port Mapping: Exposes the API on port 3010.
	Environment Variables:
	Database connection details (host, port, username, password, database name) are configured for PostgreSQL.

- **API_PORT**: Set to 3010 to indicate the backend API port.

	Dependencies: Depends on the postgres-db service.
	postgres-db (Database)
	Image: Uses the official postgres Docker image.
	Port Mapping: Exposes the PostgreSQL database on port 5432.
	Environment Variables:
	POSTGRES_USER: Username for PostgreSQL.
	POSTGRES_PASSWORD: Password for PostgreSQL.
	POSTGRES_DB: Name of the PostgreSQL database.
	Healthcheck: Ensures that PostgreSQL is ready before starting the server.

	Configuration Options
	Environment Variables
	You can set the following environment variables in your .env file for each service:

### server service:

- **DB_HOST**: Database hostname (default: postgres-db).
- **DB_PORT**: Database port (default: 5432).
- **DB_USERNAME**: Database username (default: admin).
- **DB_PASSWORD**: Database password (default: admin).
- **DB_NAME**: Database name (default: library).
- **API_PORT**: API port (default: 3010).

### web service:

- **API_UR**L: API URL for communication with the backend (default: http://server:3010).

### Additional Configuration
	postgres-db: You can modify the PostgreSQL image configuration in the docker-compose.yml if needed.
	Troubleshooting
	Container not starting: Check logs using docker-compose logs to investigate any errors.
	Database connection issues: Ensure the server service can connect to postgres-db. Verify the database environment variables.
	License
	This project is licensed under the MIT License.