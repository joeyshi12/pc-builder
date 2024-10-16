package controllers;

import database.PcComponentDatabase;
import io.javalin.http.Context;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.net.HttpHeaders;

public class PcComponentController {
    private final static String COMPONENT_AGE = "max-age=86400"; // 1 day

    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final PcComponentDatabase pcComponentDatabase;

    public PcComponentController(PcComponentDatabase pcComponentDatabase) {
        this.pcComponentDatabase = pcComponentDatabase;
    }

    public void getAllCpuComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getCpuComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all cpu components", e);
            ctx.status(500);
        }
    }

    public void getAllMotherboardComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getMotherboardComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all motherboard components", e);
            ctx.status(500);
        }
    }

    public void getAllMemoryComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getMemoryComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all memory components", e);
            ctx.status(500);
        }
    }

    public void getAllStorageComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getStorageComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all storage components", e);
            ctx.status(500);
        }
    }

    public void getAllVideoCardComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getVideoCardComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all videoCard components", e);
            ctx.status(500);
        }
    }

    public void getAllPowerSupplyComponents(Context ctx) {
        try {
            Optional<String[]> idsOpt = Optional.ofNullable(ctx.queryParam("ids"))
                .map((String idsString) -> idsString.split(","));
            if (idsOpt.isEmpty()) {
                ctx.header(HttpHeaders.CACHE_CONTROL, COMPONENT_AGE);
            }
            ctx.json(ProtoUtil.protoListToJsonString(pcComponentDatabase.getPowerSupplyComponents(idsOpt)));
        } catch (Throwable e) {
            logger.error("Failed to retrieve all powerSupply components", e);
            ctx.status(500);
        }
    }
}
