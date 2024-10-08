package controllers;

import com.google.protobuf.util.JsonFormat;

import database.UserDatabase;
import io.javalin.http.Context;
import transfers.User.UserProfile;

import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final UserDatabase userDatabase;

    public UserController(UserDatabase userDatabase) {
        this.userDatabase = userDatabase;
    }

    public void update(Context ctx) {
        try {
            UserProfile.Builder builder = UserProfile.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            UserProfile userProfile = builder.build();
            userDatabase.updateUserProfile(userProfile);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session user", e);
            ctx.status(500);
        }
    }

    public void authenticateUser(Context ctx) {
        try {
            UserProfile.Builder builder = UserProfile.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            UserProfile userProfile = builder.build();
            if (userProfile.getEmail() == null) {
                throw new Exception("Missing email");
            }
            if (userProfile.getPassword() == null) {
                throw new Exception("Missing password");
            }
            userProfile = userDatabase.getUserProfile(
                userProfile.getEmail(),
                userProfile.getPassword()
            );
            if (StringUtil.isBlank(userProfile.getUsername())) {
                throw new Exception("Failed to retrieve user from database");
            }
            ctx.sessionAttribute("session", userProfile.getUsername());
            ctx.json(JsonFormat.printer().print(userProfile));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to authenticate user", e);
            ctx.status(500);
        }
    }

    public void getSessionUser(Context ctx) {
        try {
            String username = ctx.sessionAttribute("session");
            UserProfile user = userDatabase.getUserProfile(username);
            ctx.json(JsonFormat.printer().print(user));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session variables", e);
            ctx.status(500);
        }
    }

    public void clearSessionUser(Context ctx) {
        try {
            ctx.sessionAttribute("session", null);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session user", e);
            ctx.status(500);
        }
    }
}
