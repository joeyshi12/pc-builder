# pc-builder

![deploy.yml](https://git.joeyshi.xyz/joey/pc-builder/actions/workflows/deploy.yml/badge.svg)

Website for browsing and picking PC parts for a build.

> 💡 **Heads up:**  
>
> If you’re viewing this on GitHub, note that this is just a mirror. The primary repository lives here:
>
> [git.joeyshi.xyz/joey/pc-builder](https://git.joeyshi.xyz/joey/pc-builder)

## How to deploy

1. Generate a new web build with `./run build`
2. Copy the `app.jar` and `docker-compose.yml` to a folder on your server host
3. Connect to the pcb database from DBeaver or similar DB client
4. Generate tables with `table_schemas.sql` and populate data from csv files in the `data` folder
5. Run `docker-compose up` from the server host
