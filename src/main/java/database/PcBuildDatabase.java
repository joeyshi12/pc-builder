package database;

import org.eclipse.jetty.util.StringUtil;
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
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, build.getUuid());
            ps.setString(2, build.getDisplayName());
            ps.setString(3, build.getDescription());
            ps.setString(4, build.getUsername());
            ps.setTimestamp(5, new Timestamp(build.getCreationDate()));
            ps.setTimestamp(6, new Timestamp(build.getLastUpdateDate()));
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Created computer build %s", build.getUuid()));
        }
        return build;
    }

    public List<PcBuild> getAllPcBuilds(String[] buildIds, String username) throws Exception {
        List<PcBuild> builds = new ArrayList<>();
        StringBuilder queryBuilder = new StringBuilder(
            QueryUtil.formTableSelectQuery("pc_build", TableColumnNames.COMPUTER_BUILD_COLUMNS));
        try (Connection connection = connectionHandler.getConnection()) {
            List<String> conditions = new ArrayList<String>();
            if (buildIds != null && buildIds.length > 0) {
                conditions.add(QueryUtil.formIdCondition(buildIds));
            }
            if (!StringUtil.isBlank(username)) {
                conditions.add("username = ?");
            }
            if (conditions.size() > 0) {
                queryBuilder
                    .append(" WHERE ")
                    .append(String.join(" AND ", conditions));
            }
            PreparedStatement ps = connection.prepareStatement(queryBuilder.append(" ORDER BY last_updated_date DESC").toString());
            if (!StringUtil.isBlank(username)) {
                ps.setString(1, username);
            }
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                PcBuild build = PcBuild.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setDescription(rs.getString(TableColumnNames.DESCRIPTION))
                    .setUsername(rs.getString(TableColumnNames.USERNAME))
                    .setCreationDate(rs.getDate(TableColumnNames.CREATION_DATE).getTime())
                    .setLastUpdateDate(rs.getDate(TableColumnNames.LAST_UPDATED_DATE).getTime())
                    .build();
                builds.add(build);
            }
        }
        return builds;
    }

    public void updatePcBuild(PcBuild build) throws Exception {
        try (Connection connection = connectionHandler.getConnection()) {
            try (PreparedStatement ps = connection.prepareStatement("UPDATE pc_build SET display_name = ?, description = ?, last_updated_date = ?")) {
                ps.setString(1, build.getDisplayName());
                ps.setString(2, build.getDescription());
                ps.setTimestamp(3, new Timestamp(build.getLastUpdateDate()));
                ps.executeQuery();
            }
            try (PreparedStatement ps = connection.prepareStatement("DELETE FROM is_part_of WHERE build_id = ?")) {
                ps.setString(1, build.getUuid());
                ps.executeQuery();
            }
            try (PreparedStatement ps = connection.prepareStatement("INSERT INTO is_part_of VALUES " + QueryUtil.formComponentIdValues(build))) {
                ps.executeQuery();
            }
            connection.commit();
            logger.info(String.format("Updated computer build %s", build.getUuid()));
        }
    }

    public void deletePcBuild(String buildId) throws Exception {
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("DELETE FROM pc_build WHERE id = ?")) {
            ps.setString(1, buildId);
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Deleted computer build %s", buildId));
        }
    }
}
