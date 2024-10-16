package database;

import transfers.PcComponent.*;

import java.sql.*;
import java.util.*;

public class PcComponentDatabase {
    private final ConnectionHandler connectionHandler;

    public PcComponentDatabase(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    public List<CpuComponent> getCpuComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<CpuComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("cpu", TableColumnNames.CPU_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                CpuComponent component = CpuComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setCoreCount(rs.getInt(TableColumnNames.CORE_COUNT))
                    .setCoreClock(rs.getInt(TableColumnNames.CORE_CLOCK))
                    .setBoostClock(rs.getInt(TableColumnNames.BOOST_CLOCK))
                    .setTdp(rs.getInt(TableColumnNames.TDP))
                    .setIntegratedGraphics(rs.getString(TableColumnNames.INTEGRATED_GRAPHICS))
                    .setHasSmt(rs.getBoolean(TableColumnNames.HAS_SMT))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }

    public List<MotherboardComponent> getMotherboardComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<MotherboardComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("motherboard", TableColumnNames.MOTHERBOARD_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                MotherboardComponent component = MotherboardComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setCpuSocket(rs.getString(TableColumnNames.CPU_SOCKET))
                    .setFormFactor(rs.getString(TableColumnNames.FORM_FACTOR))
                    .setMaxMemoryGigabytes(rs.getInt(TableColumnNames.MAX_MEMORY))
                    .setNumMemorySlots(rs.getInt(TableColumnNames.NUM_MEMORY_SLOTS))
                    .setColour(rs.getString(TableColumnNames.COLOUR))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }

    public List<MemoryComponent> getMemoryComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<MemoryComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("memory", TableColumnNames.MEMORY_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                MemoryComponent component = MemoryComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setDdrVersion(rs.getInt(TableColumnNames.DDR_VERSION))
                    .setDdrClock(rs.getInt(TableColumnNames.DDR_CLOCK))
                    .setNumModules(rs.getInt(TableColumnNames.NUM_MODULES))
                    .setModuleSizeGigabytes(rs.getInt(TableColumnNames.MODULE_SIZE))
                    .setColour(rs.getString(TableColumnNames.COLOUR))
                    .setFirstWordLatency(rs.getInt(TableColumnNames.FIRST_WORD_LATENCY))
                    .setCasLatency(rs.getInt(TableColumnNames.CAS_LATENCY))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }

    public List<StorageComponent> getStorageComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<StorageComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("storage", TableColumnNames.STORAGE_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                StorageComponent component = StorageComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setCapacityGigabytes(rs.getInt(TableColumnNames.CAPACITY))
                    .setType(rs.getString(TableColumnNames.TYPE))
                    .setCacheSizeMegabytes(rs.getInt(TableColumnNames.CACHE_SIZE))
                    .setFormFactor(rs.getString(TableColumnNames.FORM_FACTOR))
                    .setInterface(rs.getString(TableColumnNames.INTERFACE))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }

    public List<VideoCardComponent> getVideoCardComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<VideoCardComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("video_card", TableColumnNames.VIDEO_CARD_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                VideoCardComponent component = VideoCardComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setChipset(rs.getString(TableColumnNames.CHIPSET))
                    .setMemoryGigabytes(rs.getInt(TableColumnNames.MEMORY))
                    .setCoreClock(rs.getInt(TableColumnNames.CORE_CLOCK))
                    .setBoostClock(rs.getInt(TableColumnNames.BOOST_CLOCK))
                    .setColour(rs.getString(TableColumnNames.COLOUR))
                    .setLengthMillimeters(rs.getInt(TableColumnNames.CARD_LENGTH))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }

    public List<PowerSupplyComponent> getPowerSupplyComponents(Optional<String[]> componentIdsOpt) throws Exception {
        List<PowerSupplyComponent> components = new ArrayList<>();
        String query = QueryUtil.formQueryWithIdCondition("power_supply", TableColumnNames.POWER_SUPPLY_COLUMNS, componentIdsOpt);
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                PowerSupplyComponent component = PowerSupplyComponent.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setType(rs.getString(TableColumnNames.TYPE))
                    .setEfficiency(rs.getString(TableColumnNames.EFFICIENCY))
                    .setWattage(rs.getInt(TableColumnNames.WATTAGE))
                    .setModular(rs.getString(TableColumnNames.MODULAR))
                    .setColour(rs.getString(TableColumnNames.COLOUR))
                    .setPrice(rs.getInt(TableColumnNames.PRICE))
                    .build();
                components.add(component);
            }
        }
        return components;
    }
}
