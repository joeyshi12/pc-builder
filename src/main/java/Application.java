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
            connectionHandler = new ConnectionHandler(
                getEnvironmentVariable("DB_URL"),
                getEnvironmentVariable("DB_USERNAME"),
                getEnvironmentVariable("DB_PASSWORD")
            );
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return;
        }

        UserDatabase userDatabase = new UserDatabase(connectionHandler);
        CommentDatabase commentDatabase = new CommentDatabase(connectionHandler);
        PcComponentDatabase pcComponentDatabase = new PcComponentDatabase(connectionHandler);
        PcBuildDatabase pcBuildDatabase = new PcBuildDatabase(connectionHandler);

        UserController userController = new UserController(userDatabase);
        CommentController commentController = new CommentController(commentDatabase);
        PcComponentController pcComponentController = new PcComponentController(pcComponentDatabase);
        PcBuildController pcBuildController = new PcBuildController(pcBuildDatabase);

        Javalin app = createApplication(connectionHandler);
        app.before((Context ctx) -> ctx.header("Access-Control-Allow-Credentials", "true"));

        app.put("/users", userController::update);
        app.post("/users/authenticate", userController::authenticateUser);
        app.get("/users/session-user", userController::getSessionUser);
        app.delete("/users/session-user", userController::clearSessionUser);

        app.post("/builds", pcBuildController::create);
        app.get("/builds", pcBuildController::getAll);
        app.put("/builds", pcBuildController::update);
        app.delete("/builds/{id}", pcBuildController::delete);
        app.post("/builds/{buildId}/comments", commentController::create);
        app.get("/builds/{buildId}/comments", commentController::getAll);
        app.put("/builds/{buildId}/comments", commentController::update);
        app.delete("/builds/{buildId}/comments/{id}", commentController::delete);

        app.get("/components/cpu", pcComponentController::getAllCpuComponents);
        app.get("/components/motherboards", pcComponentController::getAllMotherboardComponents);
        app.get("/components/memory", pcComponentController::getAllMemoryComponents);
        app.get("/components/storage", pcComponentController::getAllStorageComponents);
        app.get("/components/video-cards", pcComponentController::getAllVideoCardComponents);
        app.get("/components/power-supplies", pcComponentController::getAllPowerSupplyComponents);

        app.start("0.0.0.0", 8080);
    }

    private static Javalin createApplication(ConnectionHandler connectionHandler) {
        return Javalin.create((JavalinConfig config) -> {
            config.requestLogger.http((Context ctx, Float millis) ->
                logger.info(String.format("\"%s %s\" %s", ctx.method(), ctx.fullUrl(), ctx.status())));
            config.staticFiles.add((StaticFileConfig staticFiles) -> {
                staticFiles.hostedPath = "/";
                staticFiles.directory = "public";
                staticFiles.location = Location.CLASSPATH;
                staticFiles.precompress = false;
            });
            config.jetty.modifyServer(server -> {
                server.setHandler(connectionHandler.sqlSessionHandler());
            });
        });
    }

    private static String getEnvironmentVariable(String key) throws Exception {
        String value = System.getenv(key);
        if (value == null) {
            throw new Exception(String.format("Missing %s environment variable", key));
        }
        return value;
    }
}
