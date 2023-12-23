import controllers.PcBuilderController;
import database.DatabaseConnectionHandler;
import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

public class Application {
    public static Logger logger = LoggerFactory.getLogger(Application.class.getName());

    /*
     * Registers MariaDB driver, creates API routes, and binds application on port 8080
     */
    public static void main(String[] args) throws SQLException {
        // Docs: https://mariadb.com/kb/en/about-mariadb-connector-j/#using-the-driver
        String url = System.getenv("DB_URL");
        if (url == null) {
            Application.logger.error("Missing DB_URL environment variable");
            return;
        }
        String username = System.getenv("DB_USERNAME");
        if (username == null) {
            Application.logger.error("Missing DB_USERNAME environment variable");
            return;
        }
        String password = System.getenv("DB_PASSWORD");
        if (password == null) {
            Application.logger.error("Missing DB_PASSWORD environment variable");
            return;
        }

        DatabaseConnectionHandler databaseConnectionHandler = new DatabaseConnectionHandler(url, username, password);
        PcBuilderController controller = new PcBuilderController(databaseConnectionHandler);

        Javalin app = Javalin.create(config -> {
            config.requestLogger.http((ctx, millis) -> {
                String message = String.format("\"%s %s\" %s", ctx.method(), ctx.url(), ctx.status());
                logger.info(message);
            });
            config.staticFiles.add(staticFiles -> {
                staticFiles.hostedPath = "/";
                staticFiles.directory = "public";
                staticFiles.location = Location.CLASSPATH;
                staticFiles.precompress = false;
            });
            config.jetty.sessionHandler(() -> databaseConnectionHandler.sqlSessionHandler());
        });

        app.before((ctx) -> {
            ctx.header("Access-Control-Allow-Credentials", "true");
        });

        app.post("/session/authenticate", controller::authenticateUser);
        app.get("/session/user", controller::getSessionUser);
        app.delete("/session/user", controller::clearSessionUser);

        app.put("/users/{username}", controller::updateUserProfile);

        app.put("/builds", controller::createComputerBuild);
        app.get("/builds", controller::getAllComputerBuilds);
        app.post("/builds/{id}", controller::updateComputerBuild);
        app.delete("/builds/{id}", controller::deleteComputerBuild);

        app.get("/cpu", controller::getAllCpuComponents);
        app.get("/motherboards", controller::getAllMotherboardComponents);
        app.get("/memory", controller::getAllMemoryComponents);
        app.get("/storage", controller::getAllStorageComponents);
        app.get("/video-cards", controller::getAllVideoCardComponents);
        app.get("/power-supplies", controller::getAllPowerSupplyComponents);

        app.start("0.0.0.0", 8080);
    }
}
