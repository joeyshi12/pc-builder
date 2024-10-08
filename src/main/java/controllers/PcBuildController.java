package controllers;

import com.google.protobuf.util.JsonFormat;
import com.google.protobuf.ProtocolStringList;

import database.PcBuildDatabase;
import database.PcComponentDatabase;
import io.javalin.http.Context;
import transfers.PcBuildOuterClass.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class PcBuildController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final PcBuildDatabase pcBuildDatabase;
    private final PcComponentDatabase pcComponentDatabase;

    public PcBuildController(PcBuildDatabase pcBuildDatabase, PcComponentDatabase pcComponentDatabase) {
        this.pcBuildDatabase = pcBuildDatabase;
        this.pcComponentDatabase = pcComponentDatabase;
    }

    public void getAll(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            String username = ctx.queryParam("username");
            List<String> buildStrings = new ArrayList<>();
            for (PcBuild build : pcBuildDatabase.getAllPcBuilds(idList, username)) {
                buildStrings.add(JsonFormat.printer().print(build));
            }
            ctx.json(buildStrings);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all computer builds", e);
            ctx.status(500);
        }
    }

    public void create(Context ctx) {
        try {
            String username = ctx.sessionAttribute("username");
            PcBuildDraft.Builder draftBuilder = PcBuildDraft.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), draftBuilder);
            PcBuildDraft draft = draftBuilder.build();

            java.util.Date currentDate = new java.util.Date();
            PcBuild.Builder buildBuilder = PcBuild.newBuilder()
                .setUuid(UUID.randomUUID().toString())
                .setDisplayName(draft.getDisplayName())
                .setDescription(draft.getDescription())
                .setUsername(username)
                .setCreationDate(currentDate.getTime())
                .setLastUpdateDate(currentDate.getTime());

            buildBuilder.addAllCpuList(pcComponentDatabase.getCpuComponents(protocolStringListToArray(draft.getCpuIdsList())));
            buildBuilder.addAllMotherboardList(pcComponentDatabase.getMotherboardComponents(protocolStringListToArray(draft.getMotherboardIdsList())));
            buildBuilder.addAllMemoryList(pcComponentDatabase.getMemoryComponents(protocolStringListToArray(draft.getMemoryIdsList())));
            buildBuilder.addAllStorageList(pcComponentDatabase.getStorageComponents(protocolStringListToArray(draft.getStorageIdsList())));
            buildBuilder.addAllVideoCardList(pcComponentDatabase.getVideoCardComponents(protocolStringListToArray(draft.getVideoCardIdsList())));
            buildBuilder.addAllPowerSupplyList(pcComponentDatabase.getPowerSupplyComponents(protocolStringListToArray(draft.getPowerSupplyIdsList())));

            PcBuild build = buildBuilder.build();
            pcBuildDatabase.insertPcBuild(build);
            ctx.json(JsonFormat.printer().print(build));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all videoCard components", e);
            ctx.status(500);
        }
    }

    public void update(Context ctx) {
        try {
            PcBuild.Builder builder = PcBuild.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            PcBuild build = builder.build();
            Date lastUpdatedDate = new Date();
            build = build.toBuilder()
                    .setLastUpdateDate(lastUpdatedDate.getTime())
                    .build();
            pcBuildDatabase.updatePcBuild(build);
            ctx.json(build);
            ctx.status(200);
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

    private String[] protocolStringListToArray(ProtocolStringList strList) {
        String[] strArr = new String[strList.size()];
        Iterator<String> it = strList.listIterator();
        for (int i = 0; it.hasNext(); i++) {
            strArr[i] = it.next();
        }
        return strArr;
    }
}
