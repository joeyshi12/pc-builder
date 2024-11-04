package controllers;

import database.CommentDatabase;
import io.javalin.http.Context;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CommentController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final CommentDatabase commentDatabase;

    public CommentController(CommentDatabase commentDatabase) {
        this.commentDatabase = commentDatabase;
    }

    public void getAll(Context ctx) {
        try {
            ctx.json("[]");
        } catch (Throwable e) {
            logger.error("Failed to retrieve comments", e);
            ctx.status(500);
        }
    }

    public void create(Context ctx) {
        try {
            ctx.json("lol");
        } catch (Throwable e) {
            logger.error("Failed to create comment", e);
            ctx.status(500);
        }
    }

    public void update(Context ctx) {
        try {
            ctx.json("lmao?");
        } catch (Throwable e) {
            logger.error("Failed to update comment", e);
            ctx.status(500);
        }
    }

    public void delete(Context ctx) {
        try {
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to delete comment", e);
            ctx.status(500);
        }
    }
}
