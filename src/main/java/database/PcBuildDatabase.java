package database;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import transfers.PcBuildOuterClass.*;

import java.sql.*;
import java.util.*;

public class PcBuildDatabase {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ConnectionHandler connectionHandler;

    public PcBuildDatabase(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    public PcBuild insertPcBuild(PcBuild build) throws SQLException {
        String query = "INSERT INTO pc_build (id, display_name, description, username, creation_date, last_updated_date) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = connectionHandler.getConnection()) {
            try (PreparedStatement ps = connection.prepareStatement(query)) {
                ps.setString(1, build.getUuid());
                ps.setString(2, build.getDisplayName());
                ps.setString(3, build.getDescription());
                ps.setString(4, build.getUsername());
                ps.setTimestamp(5, new Timestamp(build.getCreationDate()));
                ps.setTimestamp(6, new Timestamp(build.getLastUpdateDate()));
                ps.executeQuery();
            }
            updateIsPartOf(connection, build);
            connection.commit();
            logger.info(String.format("Created computer build %s", build.getUuid()));
        }
        return build;
    }

    public List<PcBuild> getAllPcBuilds(Optional<String[]> buildIdsOpt) throws Exception {
        List<PcBuild> builds = new ArrayList<>();
        StringBuilder queryBuilder = new StringBuilder(
            QueryUtil.formTableSelectQuery("pc_build", TableColumnNames.COMPUTER_BUILD_COLUMNS));
        try (Connection connection = connectionHandler.getConnection()) {
            if (buildIdsOpt.isPresent() && buildIdsOpt.get().length > 0) {
                queryBuilder.append(" WHERE ")
                    .append(QueryUtil.formIdCondition(buildIdsOpt.get()));
            }
            PreparedStatement ps = connection.prepareStatement(queryBuilder.append(" ORDER BY last_updated_date DESC").toString());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                PcBuild.Builder builder = PcBuild.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setDescription(rs.getString(TableColumnNames.DESCRIPTION))
                    .setUsername(rs.getString(TableColumnNames.USERNAME))
                    .setCreationDate(rs.getTimestamp(TableColumnNames.CREATION_DATE).getTime())
                    .setLastUpdateDate(rs.getTimestamp(TableColumnNames.LAST_UPDATED_DATE).getTime());

                String buildId = builder.getUuid();
                builder.addAllCpuIds(getComponentIds(connection, buildId, "cpu"))
                    .addAllMotherboardIds(getComponentIds(connection, buildId, "motherboard"))
                    .addAllMemoryIds(getComponentIds(connection, buildId, "memory"))
                    .addAllStorageIds(getComponentIds(connection, buildId, "storage"))
                    .addAllVideoCardIds(getComponentIds(connection, buildId, "video_card"))
                    .addAllPowerSupplyIds(getComponentIds(connection, buildId, "power_supply"));

                builds.add(builder.build());
            }
        }
        return builds;
    }

    public void updatePcBuild(PcBuild build) throws Exception {
        try (Connection connection = connectionHandler.getConnection()) {
            try (PreparedStatement ps = connection.prepareStatement("UPDATE pc_build SET display_name = ?, description = ?, last_updated_date = ? WHERE id = ?")) {
                ps.setString(1, build.getDisplayName());
                ps.setString(2, build.getDescription());
                ps.setTimestamp(3, new Timestamp(build.getLastUpdateDate()));
                ps.setString(4, build.getUuid());
                ps.executeQuery();
            }
            updateIsPartOf(connection, build);
            connection.commit();
            logger.info(String.format("Updated computer build %s", build.getUuid()));
        }
    }

    public void deletePcBuild(String buildId, String username) throws Exception {
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("DELETE FROM pc_build WHERE id = ? AND username = ?")) {
            ps.setString(1, buildId);
            ps.setString(2, username);
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Deleted computer build %s", buildId));
        }
    }

    private List<String> getComponentIds(Connection connection, String buildId, String component_table) throws SQLException {
        List<String> componentIds = new ArrayList<>();
        String query = "SELECT component_id FROM is_part_of WHERE build_id = ? AND component_id IN (SELECT id FROM " + component_table + ")";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, buildId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                componentIds.add(rs.getString("component_id"));
            }
        }
        return componentIds;
    }

    private void updateIsPartOf(Connection connection, PcBuild build) throws SQLException {
        try (PreparedStatement ps = connection.prepareStatement("DELETE FROM is_part_of WHERE build_id = ?")) {
            ps.setString(1, build.getUuid());
            ps.executeQuery();
        }
        List<String> componentIds = getComponentIds(build);
        if (!componentIds.isEmpty()) {
            try (PreparedStatement ps = connection.prepareStatement("INSERT INTO is_part_of(build_id, component_id) VALUES (?, ?)")) {
                for (String id : componentIds) {
                    ps.setString(1, build.getUuid());
                    ps.setString(2, id);
                    ps.addBatch();
                }
                ps.executeBatch();
            }
        }
    }

    private List<String> getComponentIds(PcBuild build) {
        List<String> componentIds = new ArrayList<>();
        for (String cpuId : build.getCpuIdsList()) {
            componentIds.add(cpuId);
        }
        for (String motherboardId : build.getMotherboardIdsList()) {
            componentIds.add(motherboardId);
        }
        for (String memoryId : build.getMemoryIdsList()) {
            componentIds.add(memoryId);
        }
        for (String storageId : build.getStorageIdsList()) {
            componentIds.add(storageId);
        }
        for (String videoCardId : build.getVideoCardIdsList()) {
            componentIds.add(videoCardId);
        }
        for (String powerSupplyId : build.getPowerSupplyIdsList()) {
            componentIds.add(powerSupplyId);
        }
        return componentIds;
    }
}
