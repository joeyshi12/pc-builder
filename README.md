# pc-builder

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

1. Generate a new build with `./run build`
2. Install Maven on your system. Then, build the application from the project root:
    ```sh
    ./run build
    ```
3. Build and run the Docker image:
    ```sh
    docker build -t pcbuilder .
    docker run -p 8080:8080 -e DB_URL=jdbc:mariadb://db:3306/pcbuilder -e DB_USERNAME=root -e DB_PASSWORD=good_password -d pcbuilder
    ```
4. Wait for the application to initialize. Then, visit `http://localhost:8080`
