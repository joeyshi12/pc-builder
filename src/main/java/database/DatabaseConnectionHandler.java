package database;

import org.eclipse.jetty.server.session.DatabaseAdaptor;
import org.eclipse.jetty.server.session.DefaultSessionCache;
import org.eclipse.jetty.server.session.JDBCSessionDataStoreFactory;
import org.eclipse.jetty.server.session.SessionCache;
import org.eclipse.jetty.server.session.SessionHandler;
import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.protobuf.ProtocolStringList;

import models.PcBuilder.*;
import java.sql.*;
import java.util.*;

public class DatabaseConnectionHandler {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final String databaseUrl;
    private final String username;
    private final String password;

    public DatabaseConnectionHandler(String databaseUrl, String username, String password) throws SQLException {
        this.databaseUrl = databaseUrl;
        this.username = username;
        this.password = password;
        try {
            // Load the MariaDB JDBC driver
            DriverManager.registerDriver(new org.mariadb.jdbc.Driver());
        } catch (SQLException e) {
            logger.error("Registering MariaDB driver failed", e);
            throw e;
        }
    }

    public Connection getConnection() throws SQLException {
        try {
            return DriverManager.getConnection(databaseUrl, username, password);
        } catch (SQLException e) {
            logger.error("Failed to establish database connection", e);
            throw e;
        }
    }

    // https://northcoder.com/post/javalin-jetty-session-tracking/
    public SessionHandler sqlSessionHandler() {
        SessionHandler sessionHandler = new SessionHandler();
        SessionCache sessionCache = new DefaultSessionCache(sessionHandler);
        String url = String.format("%s?user=%s&password=%s", databaseUrl, username, password);
        sessionCache.setSessionDataStore(
            jdbcDataStoreFactory("org.mariadb.jdbc.Driver", url).getSessionDataStore(sessionHandler)
        );
        sessionHandler.setSessionCache(sessionCache);
        sessionHandler.setHttpOnly(true);
        return sessionHandler;
    }

    private JDBCSessionDataStoreFactory jdbcDataStoreFactory(String driver, String url) {
        DatabaseAdaptor databaseAdaptor = new DatabaseAdaptor();
        databaseAdaptor.setDriverInfo(driver, url);
        JDBCSessionDataStoreFactory jdbcSessionDataStoreFactory = new JDBCSessionDataStoreFactory();
        jdbcSessionDataStoreFactory.setDatabaseAdaptor(databaseAdaptor);
        return jdbcSessionDataStoreFactory;
    }

    public UserProfile getUserProfile(String username) throws SQLException {
        UserProfile.Builder builder = UserProfile.newBuilder();
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement("SELECT username, display_name, email FROM user_profile WHERE username = ?");
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            builder
                .setUsername(rs.getString("username"))
                .setDisplayName(rs.getString("display_name"))
                .setEmail(rs.getString("email"));
        }
        return builder.build();
    }

    public UserProfile getUserProfile(String email, String password) throws SQLException {
        UserProfile.Builder builder = UserProfile.newBuilder();
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement("SELECT username, display_name, email FROM user_profile WHERE email = ? AND password = ?");
        ps.setString(1, email);
        ps.setString(2, password);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            builder
                .setUsername(rs.getString("username"))
                .setDisplayName(rs.getString("display_name"))
                .setEmail(rs.getString("email"));
        }
        return builder.build();
    }

    public UserProfile updateUserProfile(UserProfile userProfile) throws SQLException {
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement("UPDATE user_profile SET display_name = ?, email = ? WHERE username = ?");
        ps.setString(1, userProfile.getDisplayName());
        ps.setString(2, userProfile.getEmail());
        ps.setString(3, userProfile.getUsername());
        ps.executeQuery();
        connection.commit();
        ps.close();
        connection.close();
        return userProfile;
    }

    public ComputerBuild createComputerBuildFromDraft(ComputerBuildDraft draft, String username) throws SQLException {
        java.util.Date currentDate = new java.util.Date();
        ComputerBuild.Builder builder = ComputerBuild.newBuilder()
            .setUuid(UUID.randomUUID().toString())
            .setDisplayName(draft.getDisplayName())
            .setDescription(draft.getDescription())
            .setUsername(username)
            .setCreationDate(currentDate.getTime())
            .setLastUpdateDate(currentDate.getTime());

        List<CpuComponent> cpuComponents = getCpuComponents(protocolStringListToArray(draft.getCpuIdsList()));
        builder.setCpuList(CpuComponentList.newBuilder().addAllCpuComponents(cpuComponents).build());

        List<MotherboardComponent> motherboardComponents = getMotherboardComponents(protocolStringListToArray(draft.getMotherboardIdsList()));
        builder.setMotherboardList(MotherboardComponentList.newBuilder().addAllMotherboardComponents(motherboardComponents).build());

        List<MemoryComponent> memoryComponents = getMemoryComponents(protocolStringListToArray(draft.getMemoryIdsList()));
        builder.setMemoryList(MemoryComponentList.newBuilder().addAllMemoryComponents(memoryComponents).build());

        List<StorageComponent> storageComponents = getStorageComponents(protocolStringListToArray(draft.getStorageIdsList()));
        builder.setStorageList(StorageComponentList.newBuilder().addAllStorageComponents(storageComponents).build());

        List<VideoCardComponent> videoCardComponents = getVideoCardComponents(protocolStringListToArray(draft.getVideoCardIdsList()));
        builder.setVideoCardList(VideoCardComponentList.newBuilder().addAllVideoCardComponents(videoCardComponents).build());

        List<PowerSupplyComponent> powerSupplyComponents = getPowerSupplyComponents(protocolStringListToArray(draft.getPowerSupplyIdsList()));
        builder.setPowerSupplyList(PowerSupplyComponentList.newBuilder().addAllPowerSupplyComponents(powerSupplyComponents).build());

        ComputerBuild newBuild = builder.build();
        String query = "INSERT INTO computer_build (id, display_name, creation_date, last_updated_date) VALUES (?, ?, ?, ?)";
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement(query);
        ps.setString(1, newBuild.getUuid());
        ps.setString(2, newBuild.getDisplayName());
        ps.setDate(3, new java.sql.Date(newBuild.getCreationDate()));
        ps.setDate(4, new java.sql.Date(newBuild.getLastUpdateDate()));
        ps.executeQuery();
        connection.commit();
        logger.info(String.format("Created computer build %s", newBuild.getUuid()));
        ps.close();
        connection.close();
        return builder.build();
    }

    private String[] protocolStringListToArray(ProtocolStringList strList) {
        String[] strArr = new String[strList.size()];
        Iterator<String> it = strList.listIterator();
        for (int i = 0; it.hasNext(); i++) {
            strArr[i] = it.next();
        }
        return strArr;
    }

    public List<ComputerBuild> getAllComputerBuilds(String[] buildIds, String username) throws SQLException {
        List<ComputerBuild> builds = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("computer_build", TableColumnNames.COMPUTER_BUILD_COLUMNS, buildIds);
        PreparedStatement ps;
        if (StringUtil.isNotBlank(username)) {
            if (buildIds == null || buildIds.length == 0) {
                query = query + " WHERE username = ?";
            } else {
                query = query + " AND username = ?";
            }
            ps = connection.prepareStatement(query);
            ps.setString(1, username);
        } else {
            ps = connection.prepareStatement(query);
        }
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            ComputerBuild build = ComputerBuild.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                    .setUsername(rs.getString(TableColumnNames.USERNAME))
                    .setCreationDate(rs.getDate(TableColumnNames.CREATION_DATE).getTime())
                    .setLastUpdateDate(rs.getDate(TableColumnNames.LAST_UPDATED_DATE).getTime())
                    .build();
            builds.add(build);
        }
        connection.close();
        return builds;
    }

    public void updateComputerBuild(ComputerBuild build) throws SQLException {
        logger.info(String.format("Updated computer build %s", build.getUuid()));
    }

    public void deleteComputerBuild(String buildId) throws SQLException {
        logger.info(String.format("Deleted computer build %s", buildId));
    }

    public List<CpuComponent> getCpuComponents(String[] componentIds) throws SQLException {
        List<CpuComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("cpu", TableColumnNames.CPU_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    public List<MotherboardComponent> getMotherboardComponents(String[] componentIds) throws SQLException {
        List<MotherboardComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("motherboard", TableColumnNames.MOTHERBOARD_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    public List<MemoryComponent> getMemoryComponents(String[] componentIds) throws SQLException {
        List<MemoryComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("memory", TableColumnNames.MEMORY_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    public List<StorageComponent> getStorageComponents(String[] componentIds) throws SQLException {
        List<StorageComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("storage", TableColumnNames.STORAGE_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    public List<VideoCardComponent> getVideoCardComponents(String[] componentIds) throws SQLException {
        List<VideoCardComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("video_card", TableColumnNames.VIDEO_CARD_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    public List<PowerSupplyComponent> getPowerSupplyComponents(String[] componentIds) throws SQLException {
        List<PowerSupplyComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String query = formQueryWithIdsFilter("power_supply", TableColumnNames.POWER_SUPPLY_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(query);
        ResultSet rs = ps.executeQuery();
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
        connection.close();
        return components;
    }

    private String formQueryWithIdsFilter(String tableName, String[] columns, String[] ids) {
        String columnString = String.join(", ", columns);
        if (ids == null || ids.length == 0) {
            String query = String.format("SELECT %s FROM %s", columnString, tableName);
            return query;
        }
        List<String> delimitedIds = new ArrayList<>();
        for (int i = 0; i < ids.length; i++) {
            String delimitedId = String.format("'%s'", ids[i]);
            delimitedIds.add(delimitedId);
        }
        String idSetString = String.join(",", delimitedIds);
        String query = String.format("SELECT %s FROM %s WHERE id IN (%s)", columnString, tableName, idSetString);
        return query;
    }
}
