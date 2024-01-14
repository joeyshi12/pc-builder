package controllers;

import com.google.protobuf.util.JsonFormat;
import database.DatabaseConnectionHandler;
import io.javalin.http.Context;
import models.PcBuilder.*;

import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class PcBuilderController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final DatabaseConnectionHandler databaseConnectionHandler;

    private static final String IDS_PARAM_KEY = "ids";
    private static final String USER_PARAM_KEY = "user";
    private static final String SESSION_USERNAME = "username";

    public PcBuilderController(DatabaseConnectionHandler databaseConnectionHandler) {
        this.databaseConnectionHandler = databaseConnectionHandler;
    }

    public void authenticateUser(Context ctx) {
        try {
            UserProfileDto.Builder builder = UserProfileDto.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            UserProfileDto userProfile = builder.build();
            if (userProfile.getEmail() == null) {
                throw new Exception("Missing email");
            }
            if (userProfile.getPassword() == null) {
                throw new Exception("Missing password");
            }
            userProfile = databaseConnectionHandler.getUserProfile(
                userProfile.getEmail(),
                userProfile.getPassword()
            );
            if (StringUtil.isBlank(userProfile.getUsername())) {
                throw new Exception("Failed to retrieve user from database");
            }
            ctx.sessionAttribute(PcBuilderController.SESSION_USERNAME, userProfile.getUsername());
            ctx.json(JsonFormat.printer().print(userProfile));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to authenticate user", e);
            ctx.status(500);
        }
    }

    public void getSessionUser(Context ctx) {
        try {
            String username = ctx.sessionAttribute(PcBuilderController.SESSION_USERNAME);
            UserProfileDto user = databaseConnectionHandler.getUserProfile(username);
            ctx.json(JsonFormat.printer().print(user));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session variables", e);
            ctx.status(500);
        }
    }

    public void clearSessionUser(Context ctx) {
        try {
            ctx.sessionAttribute(PcBuilderController.SESSION_USERNAME, null);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session user", e);
            ctx.status(500);
        }
    }

    public void updateUserProfile(Context ctx) {
        try {
            UserProfileDto.Builder builder = UserProfileDto.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            UserProfileDto userProfile = builder.build();
            databaseConnectionHandler.updateUserProfile(userProfile);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to fetch session user", e);
            ctx.status(500);
        }
    }

    public void createComputerBuild(Context ctx) {
        try {
            String username = ctx.sessionAttribute(PcBuilderController.SESSION_USERNAME);
            ComputerBuildDraftDto.Builder builder = ComputerBuildDraftDto.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            ComputerBuildDraftDto draft = builder.build();
            ComputerBuildDto build = databaseConnectionHandler.createComputerBuildFromDraft(draft, username);
            ctx.json(JsonFormat.printer().print(build));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to create computer build", e);
            ctx.status(500);
        }
    }

    public void getAllComputerBuilds(Context ctx) {
        try {
            String idsValue = ctx.queryParam(PcBuilderController.IDS_PARAM_KEY);
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            String username = ctx.queryParam(PcBuilderController.USER_PARAM_KEY);
            List<ComputerBuildDto> builds = databaseConnectionHandler.getAllComputerBuilds(idList, username);
            ComputerBuildListDto buildList = ComputerBuildListDto.newBuilder().addAllComputerBuilds(builds).build();
            ctx.json(JsonFormat.printer().print(buildList));
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all computer builds", e);
            ctx.status(500);
        }
    }

    public void updateComputerBuild(Context ctx) {
        try {
            ComputerBuildDto.Builder builder = ComputerBuildDto.newBuilder();
            JsonFormat.parser().ignoringUnknownFields().merge(ctx.body(), builder);
            ComputerBuildDto build = builder.build();
            Date lastUpdatedDate = new Date();
            build = build.toBuilder()
                    .setLastUpdateDate(lastUpdatedDate.getTime())
                    .build();
            databaseConnectionHandler.updateComputerBuild(build);
            ctx.json(build);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to update computer build", e);
            ctx.status(500);
        }
    }

    public void deleteComputerBuild(Context ctx) {
        try {
            String buildId = ctx.pathParam("id");
            databaseConnectionHandler.deleteComputerBuild(buildId);
            ctx.status(200);
        } catch (Throwable e) {
            logger.error("Failed to delete computer build", e);
            ctx.status(500);
        }
    }

    public void getAllCpuComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            CpuComponentListDto cpuList = databaseConnectionHandler.getCpuComponents(idList);
            ctx.json(JsonFormat.printer().print(cpuList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all cpu components", e);
            ctx.status(500);
        }
    }

    public void getAllMotherboardComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            MotherboardComponentListDto motherboardList = databaseConnectionHandler.getMotherboardComponents(idList);
            ctx.json(JsonFormat.printer().print(motherboardList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all motherboard components", e);
            ctx.status(500);
        }
    }

    public void getAllMemoryComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            MemoryComponentListDto memoryList = databaseConnectionHandler.getMemoryComponents(idList);
            ctx.json(JsonFormat.printer().print(memoryList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all memory components", e);
            ctx.status(500);
        }
    }

    public void getAllStorageComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            StorageComponentListDto storageList = databaseConnectionHandler.getStorageComponents(idList);
            ctx.json(JsonFormat.printer().print(storageList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all storage components", e);
            ctx.status(500);
        }
    }

    public void getAllVideoCardComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            VideoCardComponentListDto videoCardList = databaseConnectionHandler.getVideoCardComponents(idList);
            ctx.json(JsonFormat.printer().print(videoCardList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all videoCard components", e);
            ctx.status(500);
        }
    }

    public void getAllPowerSupplyComponents(Context ctx) {
        try {
            String[] idList = parseIdsQueryParam(ctx);
            PowerSupplyComponentListDto powerSupplyList = databaseConnectionHandler.getPowerSupplyComponents(idList);
            ctx.json(JsonFormat.printer().print(powerSupplyList));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all powerSupply components", e);
            ctx.status(500);
        }
    }

    private String[] parseIdsQueryParam(Context ctx) {
        String idsValue = ctx.queryParam(PcBuilderController.IDS_PARAM_KEY);
        return idsValue == null ? null : idsValue.split(",");
    }
}
