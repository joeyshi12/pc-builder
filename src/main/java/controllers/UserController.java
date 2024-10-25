package controllers;

import com.google.protobuf.util.JsonFormat;

import database.UserDatabase;
import io.javalin.http.Context;
import transfers.User.UserProfile;

import java.util.Optional;

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
            String sessionUsername = ctx.sessionAttribute(SessionAttributes.USER);
            if (!userProfile.getUsername().equals(sessionUsername)) {
                logger.error(String.format("User %s cannot update user %s", sessionUsername, userProfile.getUsername()));
                ctx.status(400);
                return;
            }
            ctx.json(JsonFormat.printer().print(userDatabase.updateUserProfile(userProfile)));
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
            if (userProfile.getUsername().isEmpty()) {
                logger.error("Missing username");
                ctx.status(400);
                return;
            }
            if (userProfile.getPassword().isEmpty()) {
                logger.error("Missing password");
                ctx.status(400);
                return;
            }
            userProfile = userDatabase.getUserProfile(
                userProfile.getUsername(),
                userProfile.getPassword()
            );
            if (StringUtil.isBlank(userProfile.getUsername())) {
                throw new Exception("Failed to retrieve user from database");
            }
            ctx.sessionAttribute("user", userProfile.getUsername());
            ctx.json(JsonFormat.printer().print(userProfile));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to authenticate user", e);
            ctx.status(500);
        }
    }

    public void getSessionUser(Context ctx) {
        Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
        if (usernameOpt.isEmpty()) {
            ctx.json("Not logged in");
            ctx.status(400);
            return;
        }
        try {
            UserProfile user = userDatabase.getUserProfile(usernameOpt.get());
            ctx.json(JsonFormat.printer().print(user));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session variables", e);
            ctx.status(500);
        }
    }

    public void clearSessionUser(Context ctx) {
        try {
            ctx.sessionAttribute(SessionAttributes.USER, null);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session user", e);
            ctx.status(500);
        }
    }
}
