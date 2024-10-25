package controllers;
import java.util.Optional;

import io.javalin.http.Context;

class SessionAttributes {
    public static String USER = "user";

    public static Optional<String> getUserAttribute(Context ctx) {
        return Optional.ofNullable(ctx.sessionAttribute(USER));
    }
}
