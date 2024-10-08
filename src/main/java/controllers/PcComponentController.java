package controllers;

import com.google.protobuf.util.JsonFormat;

import database.PcComponentDatabase;
import io.javalin.http.Context;
import transfers.PcComponent.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class PcComponentController {
    private final Logger logger = LoggerFactory.getLogger(getClass().getName());
    private final PcComponentDatabase pcComponentDatabase;

    public PcComponentController(PcComponentDatabase pcComponentDatabase) {
        this.pcComponentDatabase = pcComponentDatabase;
    }

    public void getAllCpuComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> cpuStrings = new ArrayList<>();
            for (CpuComponent cpu : pcComponentDatabase.getCpuComponents(idList)) {
                cpuStrings.add(JsonFormat.printer().print(cpu));
            }
            ctx.json(cpuStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all cpu components", e);
            ctx.status(500);
        }
    }

    public void getAllMotherboardComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> motherboardStrings = new ArrayList<>();
            for (MotherboardComponent motherboard : pcComponentDatabase.getMotherboardComponents(idList)) {
                motherboardStrings.add(JsonFormat.printer().print(motherboard));
            }
            ctx.json(motherboardStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all motherboard components", e);
            ctx.status(500);
        }
    }

    public void getAllMemoryComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> memoryStrings = new ArrayList<>();
            for (MemoryComponent memory : pcComponentDatabase.getMemoryComponents(idList)) {
                memoryStrings.add(JsonFormat.printer().print(memory));
            }
            ctx.json(memoryStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all memory components", e);
            ctx.status(500);
        }
    }

    public void getAllStorageComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> storageStrings = new ArrayList<>();
            for (StorageComponent storage : pcComponentDatabase.getStorageComponents(idList)) {
                storageStrings.add(JsonFormat.printer().print(storage));
            }
            ctx.json(storageStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all storage components", e);
            ctx.status(500);
        }
    }

    public void getAllVideoCardComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> videoCardStrings = new ArrayList<>();
            for (VideoCardComponent videoCard : pcComponentDatabase.getVideoCardComponents(idList)) {
                videoCardStrings.add(JsonFormat.printer().print(videoCard));
            }
            ctx.json(videoCardStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all videoCard components", e);
            ctx.status(500);
        }
    }

    public void getAllPowerSupplyComponents(Context ctx) {
        try {
            String idsValue = ctx.queryParam("ids");
            String[] idList = null;
            if (idsValue != null) {
                idList =  idsValue.split(",");
            }
            List<String> powerSupplyStrings = new ArrayList<>();
            for (PowerSupplyComponent powerSupply : pcComponentDatabase.getPowerSupplyComponents(idList)) {
                powerSupplyStrings.add(JsonFormat.printer().print(powerSupply));
            }
            ctx.json(powerSupplyStrings);
        } catch (Throwable e) {
            logger.error("Failed to retrieve all powerSupply components", e);
            ctx.status(500);
        }
    }
}
