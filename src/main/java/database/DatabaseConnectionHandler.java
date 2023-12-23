package database;

import org.eclipse.jetty.server.session.DatabaseAdaptor;
import org.eclipse.jetty.server.session.DefaultSessionCache;
import org.eclipse.jetty.server.session.JDBCSessionDataStoreFactory;
import org.eclipse.jetty.server.session.SessionCache;
import org.eclipse.jetty.server.session.SessionHandler;
import org.eclipse.jetty.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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

    public ComputerBuild createComputerBuild(ComputerBuild build) throws SQLException {
        java.util.Date currentDate = new java.util.Date();
        ComputerBuild.Builder builder = ComputerBuild.newBuilder()
            .setUuid(UUID.randomUUID().toString())
            .setCreationDate(currentDate.getTime())
            .setLastUpdateDate(currentDate.getTime());

        List<String> cpuIds = new ArrayList<>();
        for (CpuComponent cpuComponent : build.getCpuList().getCpuComponentsList()) {
            cpuIds.add(cpuComponent.getUuid());
        }
        List<CpuComponent> cpuComponents = getCpuComponents((String[]) cpuIds.toArray());
        builder.setCpuList(CpuComponentList.newBuilder().addAllCpuComponents(cpuComponents).build());

        List<String> motherboardIds = new ArrayList<>();
        for (MotherboardComponent motherboardComponent : build.getMotherboardList().getMotherboardComponentsList()) {
            motherboardIds.add(motherboardComponent.getUuid());
        }
        List<MotherboardComponent> motherboardComponents = getMotherboardComponents((String[]) motherboardIds.toArray());
        builder.setMotherboardList(MotherboardComponentList.newBuilder().addAllMotherboardComponents(motherboardComponents).build());

        List<String> memoryIds = new ArrayList<>();
        for (MemoryComponent memoryComponent : build.getMemoryList().getMemoryComponentsList()) {
            memoryIds.add(memoryComponent.getUuid());
        }
        List<MemoryComponent> memoryComponents = getMemoryComponents((String[]) memoryIds.toArray());
        builder.setMemoryList(MemoryComponentList.newBuilder().addAllMemoryComponents(memoryComponents).build());

        List<String> storageIds = new ArrayList<>();
        for (StorageComponent storageComponent : build.getStorageList().getStorageComponentsList()) {
            storageIds.add(storageComponent.getUuid());
        }
        List<StorageComponent> storageComponents = getStorageComponents((String[]) storageIds.toArray());
        builder.setStorageList(StorageComponentList.newBuilder().addAllStorageComponents(storageComponents).build());

        List<String> videoCardIds = new ArrayList<>();
        for (VideoCardComponent videoCardComponent : build.getVideoCardList().getVideoCardComponentsList()) {
            videoCardIds.add(videoCardComponent.getUuid());
        }
        List<VideoCardComponent> videoCardComponents = getVideoCardComponents((String[]) videoCardIds.toArray());
        builder.setVideoCardList(VideoCardComponentList.newBuilder().addAllVideoCardComponents(videoCardComponents).build());

        List<String> powerSupplyIds = new ArrayList<>();
        for (PowerSupplyComponent powerSupplyComponent : build.getPowerSupplyList().getPowerSupplyComponentsList()) {
            powerSupplyIds.add(powerSupplyComponent.getUuid());
        }
        List<PowerSupplyComponent> powerSupplyComponents = getPowerSupplyComponents((String[]) powerSupplyIds.toArray());
        builder.setPowerSupplyList(PowerSupplyComponentList.newBuilder().addAllPowerSupplyComponents(powerSupplyComponents).build());

        ComputerBuild newBuild = builder.build();

        String query = "INSERT INTO computer_build (id, creation_date, last_updated_date) VALUES (?, ?, ?)";
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement(query);
        ps.setString(1, newBuild.getUuid());
        ps.setDate(2, new java.sql.Date(newBuild.getCreationDate()));
        ps.setDate(3, new java.sql.Date(newBuild.getLastUpdateDate()));
        ps.executeQuery();
        connection.commit();
        logger.info(String.format("Created computer build %s", newBuild.getUuid()));
        ps.close();
        connection.close();

        return builder.build();
    }

    public List<ComputerBuild> getAllComputerBuilds(String buildId) throws SQLException {
        List<ComputerBuild> builds = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(", ", TableColumnNames.COMPUTER_BUILD_COLUMNS);
        PreparedStatement ps;
        if (StringUtil.isBlank(buildId)) {
            String query = String.format("SELECT %s FROM computer_build", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String query = String.format("SELECT %s FROM computer_build WHERE id = ?", columnString);
            ps = connection.prepareStatement(query);
            ps.setString(1, buildId);
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
        rs.close();

//        if (StringUtil.isBlank(buildId) || builds.isEmpty()) {
//            return builds;
//        }
//
//        ComputerBuild.Builder builder = builds.get(0).toBuilder();
//        List<String> componentIds = new ArrayList<>();
//        String query = "SELECT component_id, build_id FROM is_part_of WHERE build_id = ?";
//        ps = connection.prepareStatement(query);
//        ps.setString(1, buildId);
//        rs = ps.executeQuery();
//        while (rs.next()) {
//            componentIds.add("'" + rs.getString("component_id") + "'");
//        }
//        rs.close();
//        connection.close();
//
//        List<CpuComponent> cpuComponents = getCpuComponents((String[]) componentIds.toArray());
//        CpuComponentList cpuList = CpuComponentList.newBuilder()
//            .addAllCpuComponents(cpuComponents)
//            .build();
//        builder.setCpuList(cpuList);
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
        String columnString = String.join(", ", TableColumnNames.CPU_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM cpu", columnString);
            ps = connection.prepareStatement(query);
        } else {
            List<String> delimitedIds = new ArrayList<>();
            for (int i = 0; i < componentIds.length; i++) {
                String delimitedId = String.format("'%s'", componentIds[i]);
                delimitedIds.add(delimitedId);
            }
            String idSetString = String.join(",", delimitedIds);
            String query = String.format("SELECT %s FROM cpu WHERE id IN (%s)", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }

    public List<MotherboardComponent> getMotherboardComponents(String[] componentIds) throws SQLException {
        List<MotherboardComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(",", TableColumnNames.MOTHERBOARD_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM motherboard", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String[] delimitedIds = (String[]) Arrays.stream(componentIds).map(id -> "'" + id + "'").toArray();
            String idSetString = String.join(", ", delimitedIds);
            String query = String.join("SELECT %s FROM motherboard WHERE id IN %s", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }

    public List<MemoryComponent> getMemoryComponents(String[] componentIds) throws SQLException {
        List<MemoryComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(",", TableColumnNames.MEMORY_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM memory", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String[] delimitedIds = (String[]) Arrays.stream(componentIds).map(id -> "'" + id + "'").toArray();
            String idSetString = String.join(", ", delimitedIds);
            String query = String.join("SELECT %s FROM memory WHERE id IN %s", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }

    public List<StorageComponent> getStorageComponents(String[] componentIds) throws SQLException {
        List<StorageComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(",", TableColumnNames.STORAGE_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM storage", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String[] delimitedIds = (String[]) Arrays.stream(componentIds).map(id -> "'" + id + "'").toArray();
            String idSetString = String.join(", ", delimitedIds);
            String query = String.join("SELECT %s FROM storage WHERE id IN %s", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }

    public List<VideoCardComponent> getVideoCardComponents(String[] componentIds) throws SQLException {
        List<VideoCardComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(",", TableColumnNames.VIDEO_CARD_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM video_card", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String[] delimitedIds = (String[]) Arrays.stream(componentIds).map(id -> "'" + id + "'").toArray();
            String idSetString = String.join(", ", delimitedIds);
            String query = String.join("SELECT %s FROM video_card WHERE id IN %s", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }

    public List<PowerSupplyComponent> getPowerSupplyComponents(String[] componentIds) throws SQLException {
        List<PowerSupplyComponent> components = new ArrayList<>();
        Connection connection = getConnection();
        String columnString = String.join(",", TableColumnNames.POWER_SUPPLY_COLUMNS);
        PreparedStatement ps;
        if (componentIds == null || componentIds.length == 0) {
            String query = String.format("SELECT %s FROM power_supply", columnString);
            ps = connection.prepareStatement(query);
        } else {
            String[] delimitedIds = (String[]) Arrays.stream(componentIds).map(id -> "'" + id + "'").toArray();
            String idSetString = String.join(", ", delimitedIds);
            String query = String.join("SELECT %s FROM power_supply WHERE id IN %s", columnString, idSetString);
            ps = connection.prepareStatement(query);
        }
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
        rs.close();
        connection.close();
        return components;
    }
}
