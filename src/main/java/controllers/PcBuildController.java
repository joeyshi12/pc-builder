package controllers;

import com.google.protobuf.util.JsonFormat;

import database.PcBuildDatabase;
import io.javalin.http.Context;
import transfers.PcBuildOuterClass.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class PcBuildController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final PcBuildDatabase pcBuildDatabase;

    public PcBuildController(PcBuildDatabase pcBuildDatabase) {
        this.pcBuildDatabase = pcBuildDatabase;
    }

    public void create(Context ctx) {
        Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
        if (usernameOpt.isEmpty()) {
            ctx.json("Not logged in");
            ctx.status(400);
            return;
        }
        try {
            PcBuild.Builder builder = PcBuild.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            Date creationDate = new Date();
            builder.setUuid(UUID.randomUUID().toString())
                .setUsername(usernameOpt.get())
                .setCreationDate(creationDate.getTime())
                .setLastUpdateDate(creationDate.getTime());
            ctx.json(JsonFormat.printer().print(pcBuildDatabase.insertPcBuild(builder.build())));
        } catch (Throwable e) {
            logger.error("Failed to create new build", e);
            ctx.status(500);
        }
    }

    public void getAll(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            ctx.json(ProtoUtil.protoListToJsonString(pcBuildDatabase.getAllPcBuilds(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all computer builds", e);
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
            PcBuild.Builder builder = PcBuild.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            PcBuild build = builder.setLastUpdateDate(new Date().getTime()).build();
            pcBuildDatabase.updatePcBuild(build);
            ctx.json(JsonFormat.printer().print(build));
        } catch (Throwable e) {
            logger.error("Failed to update build", e);
            ctx.status(500);
        }
    }

    public void delete(Context ctx) {
        Optional<String> usernameOpt = SessionAttributes.getUserAttribute(ctx);
        if (usernameOpt.isEmpty()) {
            ctx.json("Not logged in");
            ctx.status(400);
            return;
        }
        try {
            String buildId = ctx.pathParam("id");
            pcBuildDatabase.deletePcBuild(buildId, usernameOpt.get());
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to delete computer build", e);
            ctx.status(500);
        }
    }
}
