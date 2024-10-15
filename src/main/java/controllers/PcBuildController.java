package controllers;

import com.google.common.net.HttpHeaders;
import com.google.protobuf.util.JsonFormat;

import database.PcBuildDatabase;
import io.javalin.http.Context;
import transfers.PcBuildOuterClass.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class PcBuildController {
    private final static String BUILD_AGE = "max-age=86400"; // 1 day

    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final PcBuildDatabase pcBuildDatabase;

    public PcBuildController(PcBuildDatabase pcBuildDatabase) {
        this.pcBuildDatabase = pcBuildDatabase;
    }

    public void getAll(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            } else {
                ctx.header(HttpHeaders.CACHE_CONTROL, BUILD_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(
                pcBuildDatabase.getAllPcBuilds(idList, ctx.queryParam(SessionAttributes.USER))));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all computer builds", e);
            ctx.status(500);
        }
    }

    public void create(Context ctx) {
        try {
            PcBuild.Builder builder = PcBuild.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            Date creationDate = new Date();
            builder.setUuid(UUID.randomUUID().toString())
                .setUsername(ctx.sessionAttribute(SessionAttributes.USER))
                .setCreationDate(creationDate.getTime())
                .setLastUpdateDate(creationDate.getTime());
            ctx.json(JsonFormat.printer().print(pcBuildDatabase.insertPcBuild(builder.build())));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all videoCard components", e);
            ctx.status(500);
        }
    }

    public void update(Context ctx) {
        try {
            PcBuild.Builder builder = PcBuild.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            PcBuild build = builder.setLastUpdateDate(new Date().getTime()).build();
            pcBuildDatabase.updatePcBuild(build);
            ctx.json(build);
        } catch (Throwable e) {
            logger.error("Failed to update computer build", e);
            ctx.status(500);
        }
    }

    public void delete(Context ctx) {
        try {
            String buildId = ctx.pathParam("id");
            pcBuildDatabase.deletePcBuild(buildId);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to delete computer build", e);
            ctx.status(500);
        }
    }
}
