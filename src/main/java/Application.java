import controllers.*;
import database.*;
import io.javalin.Javalin;
import io.javalin.config.JavalinConfig;
import io.javalin.http.Context;
import io.javalin.http.staticfiles.Location;
import io.javalin.http.staticfiles.StaticFileConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Application {
    public static Logger logger = LoggerFactory.getLogger(Application.class.getName());

    /*
     * Registers MariaDB driver, creates API routes, and binds application on port 8080
     */
    public static void main(String[] args) {
        ConnectionHandler connectionHandler;
        try {
            connectionHandler = createConnectionHandler();
        } catch (Exception e) {
            Application.logger.error(e.getMessage(), e);
            return;
        }

        UserDatabase userDatabase = new UserDatabase(connectionHandler);
        PcComponentDatabase pcComponentDatabase = new PcComponentDatabase(connectionHandler);
        PcBuildDatabase pcBuildDatabase = new PcBuildDatabase(connectionHandler);

        UserController userController = new UserController(userDatabase);
        PcComponentController pcComponentController = new PcComponentController(pcComponentDatabase);
        PcBuildController pcBuildController = new PcBuildController(pcBuildDatabase);

        try (Javalin app = createApplication(connectionHandler)) {
            app.before((Context ctx) -> ctx.header("Access-Control-Allow-Credentials", "true"));

            app.put("/users", userController::update);
            app.post("/users/authenticate", userController::authenticateUser);
            app.get("/users/session-user", userController::getSessionUser);
            app.delete("/users/session-user", userController::clearSessionUser);

            app.put("/builds", pcBuildController::create);
            app.get("/builds", pcBuildController::getAll);
            app.post("/builds", pcBuildController::update);
            app.delete("/builds/{id}", pcBuildController::delete);

            app.get("/components/cpu", pcComponentController::getAllCpuComponents);
            app.get("/components/motherboards", pcComponentController::getAllMotherboardComponents);
            app.get("/components/memory", pcComponentController::getAllMemoryComponents);
            app.get("/components/storage", pcComponentController::getAllStorageComponents);
            app.get("/components/video-cards", pcComponentController::getAllVideoCardComponents);
            app.get("/components/power-supplies", pcComponentController::getAllPowerSupplyComponents);

            app.start("0.0.0.0", 8080);
        }
    }

    private static Javalin createApplication(ConnectionHandler connectionHandler) {
        return Javalin.create((JavalinConfig config) -> {
            config.requestLogger.http((Context ctx, Float millis) ->
                logger.info(String.format("\"%s %s\" %s", ctx.method(), ctx.url(), ctx.status())));
            config.staticFiles.add((StaticFileConfig staticFiles) -> {
                staticFiles.hostedPath = "/";
                staticFiles.directory = "public";
                staticFiles.location = Location.CLASSPATH;
                staticFiles.precompress = false;
            });
            config.jetty.sessionHandler(connectionHandler::sqlSessionHandler);
        });
    }

    private static ConnectionHandler createConnectionHandler() throws Exception {
        String url = System.getenv("DB_URL");
        if (url == null) {
            throw new Exception("Missing DB_URL environment variable");
        }
        String username = System.getenv("DB_USERNAME");
        if (username == null) {
            throw new Exception("Missing DB_USERNAME environment variable");
        }
        String password = System.getenv("DB_PASSWORD");
        if (password == null) {
            throw new Exception("Missing DB_PASSWORD environment variable");
        }
        return new ConnectionHandler(url, username, password);
    }
}
