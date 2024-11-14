# Nodejs_Express_Postgresql_Docker_REST_API_Project

This is a CRUD Rest API project built using Node.js, Express, and PostgreSQL running on a Docker container for user management. The primary purpose of this project is to save user distribution rewards data and ensure that each user can only receive a distribution once per week.

## Features

- Create, read, update, and delete (CRUD) user data.
- Validate user distribution to ensure only one distribution per user per week.
- PostgreSQL database running in a Docker container.
- Input validation and error handling.

## Prerequisites

- Node.js
- Docker

## Getting Started

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the PostgreSQL database in a Docker container:

    ```sh
    docker pull postgres
    docker run --name postgres-db -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    ```

4. Create a `.env` file based on the `.env.example` file and configure your environment variables.

5. Run database migrations:

    ```sh
    npm run migrate
    ```

6. Start the server:

    ```sh
    npm start
    ```

## API Endpoints

- `POST /user`: Create a new user.
- `POST /validate-distribution`: Validate user distribution.
- `GET /user`: Get all users.
- `GET /user/:id`: Get a user by ID.
- `GET /user-by-mail/:email`: Get a user by email.
- `PUT /user/:id`: Update a user by ID.
- `DELETE /user/:id`: Delete a user by ID.
