# Docker commands

## Check version

```sh
docker --version
```

## Pull postgres image

```sh
docker pull postgres
```

## Run postgres in docker container

```sh
docker run --name postgres-db -e POSTGRES_PASSWORD= -p 5432:5432 -d postgres
```

- `--name postgres-db`: The name of the container.
- `-e POSTGRES_PASSWORD=mysecretpassword`: Set the PostgreSQL password (replace `mysecretpassword` with your own).
- `-p 5432:5432`: Map the PostgreSQL port 5432 from the container to your local machine.
- `-d`: Run the container in detached mode.

## Get info about docker container

```sh
# Get process list
docker ps

# Inspect docker container
docker inspect 62bdae977983

# Connect to PostgreSQL Container
docker exec -it postgres-db psql -U postgres
```
