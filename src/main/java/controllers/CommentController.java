package controllers;

import database.CommentDatabase;
import io.javalin.http.Context;
import transfers.CommentOuterClass.Comment;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.protobuf.util.JsonFormat;

public class CommentController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final CommentDatabase commentDatabase;

    public CommentController(CommentDatabase commentDatabase) {
        this.commentDatabase = commentDatabase;
    }

    public void create(Context ctx) {
        Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
        if (usernameOpt.isEmpty()) {
            ctx.json("Not logged in");
            ctx.status(400);
            return;
        }
        try {
            Comment.Builder builder = Comment.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            assert builder.getBuildId().equals(getBuildIdPathParam(ctx).toString());
            long creationTime = new Date().getTime();
            Comment comment = builder
                .setUuid(UUID.randomUUID().toString())
                .setUsername(usernameOpt.get())
                .setCreationDate(creationTime)
                .setLastUpdateDate(creationTime)
                .build();
            ctx.json(JsonFormat.printer().print(commentDatabase.insertComment(comment)));
        } catch (Throwable e) {
            logger.error("Failed to create comment", e);
            ctx.status(500);
        }
    }

    public void getAll(Context ctx) {
        try {
            List<Comment> comments = commentDatabase.getComments(getBuildIdPathParam(ctx).toString());
            ctx.json(ProtoUtil.protoListToJsonString(comments));
        } catch (Throwable e) {
            logger.error("Failed to retrieve comments", e);
            ctx.status(500);
        }
    }

    public void update(Context ctx) {
        Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
        if (usernameOpt.isEmpty()) {
            ctx.json("Not logged in");
            ctx.status(400);
            return;
        }
        try {
            Comment.Builder builder = Comment.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            assert builder.getUsername().equals(usernameOpt.get());
            assert builder.getBuildId().equals(getBuildIdPathParam(ctx).toString());
            Comment comment = builder.setLastUpdateDate(new Date().getTime()).build();
            commentDatabase.updateComment(comment);
            ctx.json(JsonFormat.printer().print(comment));
        } catch (Throwable e) {
            logger.error("Failed to update comment", e);
            ctx.status(500);
        }
    }

    public void delete(Context ctx) {
        try {
            Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
            if (usernameOpt.isEmpty()) {
                ctx.json("Not logged in");
                ctx.status(400);
                return;
            }
            String commentId = ctx.pathParam("id");
            commentDatabase.deleteComment(commentId, usernameOpt.get());
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to delete comment", e);
            ctx.status(500);
        }
    }

    private UUID getBuildIdPathParam(Context ctx) throws IllegalArgumentException {
        return UUID.fromString(ctx.pathParam("buildId"));
    }
}
