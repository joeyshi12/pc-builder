# pc-builder

![docker-image.yml](https://github.com/joeyshi12/pc-builder/actions/workflows/docker-image.yml/badge.svg)

Website for browsing and picking PC parts for a build.

## Deployment steps

### Database setup

1. Run an SQL database server (e.g., mariadb):
    ```sh
    docker run --name db -e MARIADB_ROOT_PASSWORD=good_password -d mariadb:latest
    ```
2. Generate tables by running `sql/table_schemas.sql` against your database and
populate the tables with CSV files in the `data` folder.

### Application deployment

1. Pull and run the pc-builder Docker image:
    ```sh
    docker run -p 8080:8080 -e DB_URL=jdbc:mariadb://db:3306/pcbuilder -e DB_USERNAME=root -e DB_PASSWORD=good_password -d ghcr.io/joeyshi12/pc-builder:main
    ```
2. Wait for the application to initialize. Then, visit `http://localhost:8080`
