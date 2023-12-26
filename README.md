# pc-builder

A platform for browsing and designing PC builds.

## How to deploy

1. Generate a new web build with `./pcb build`
2. Copy the `app.jar` and `docker-compose.yml` to a folder on your server host
3. Connect to the pcb database from DBeaver or similar DB client
4. Generate tables with `table_schemas.sql` and populate data from csv files in the `data` folder
5. Run `docker-compose up` from the server host
