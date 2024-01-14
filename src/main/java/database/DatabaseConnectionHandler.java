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

    public SessionHandler sqlSessionHandler() {
        SessionHandler sessionHandler = new SessionHandler();
        SessionCache sessionCache = new DefaultSessionCache(sessionHandler);
        String url = String.format("%s?user=%s&password=%s", databaseUrl, username, password);
        sessionCache.setSessionDataStore(
            jdbcDataStoreFactory(url).getSessionDataStore(sessionHandler)
        );
        sessionHandler.setSessionCache(sessionCache);
        sessionHandler.setHttpOnly(true);
        return sessionHandler;
    }

    private JDBCSessionDataStoreFactory jdbcDataStoreFactory(String url) {
        DatabaseAdaptor databaseAdaptor = new DatabaseAdaptor();
        databaseAdaptor.setDriverInfo("org.mariadb.jdbc.Driver", url);
        JDBCSessionDataStoreFactory jdbcSessionDataStoreFactory = new JDBCSessionDataStoreFactory();
        jdbcSessionDataStoreFactory.setDatabaseAdaptor(databaseAdaptor);
        return jdbcSessionDataStoreFactory;
    }

    public UserProfileDto getUserProfile(String username) throws SQLException {
        ParseDatabaseEntities<UserProfileDto> parseUsers = (ResultSet rs) -> UserProfileDto.newBuilder()
            .setUsername(rs.getString(TableColumnNames.USERNAME))
            .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
            .setEmail(rs.getString(TableColumnNames.EMAIL))
            .build();
        String queryString = formQueryString("user_profile", TableColumnNames.USER_PROFILE_COLUMNS) + " WHERE username = ?";
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement(queryString);
        ps.setString(1, username);
        ResultSet rs = ps.executeQuery();
        return getRowEntities(rs, parseUsers).stream().findFirst().orElse(UserProfileDto.getDefaultInstance());
    }

    public UserProfileDto getUserProfile(String email, String password) throws SQLException {
        ParseDatabaseEntities<UserProfileDto> parseUsers = (ResultSet rs) -> UserProfileDto.newBuilder()
            .setUsername(rs.getString(TableColumnNames.USERNAME))
            .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
            .setEmail(rs.getString(TableColumnNames.EMAIL))
            .build();
        String queryString = formQueryString("user_profile", TableColumnNames.USER_PROFILE_COLUMNS) + " WHERE email = ? AND password = ?";
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement(queryString);
        ps.setString(1, email);
        ps.setString(2, password);
        ResultSet rs = ps.executeQuery();
        return getRowEntities(rs, parseUsers).stream().findFirst().orElse(UserProfileDto.getDefaultInstance());
    }

    public UserProfileDto updateUserProfile(UserProfileDto userProfile) throws SQLException {
        Connection connection = getConnection();
        PreparedStatement ps = connection.prepareStatement("UPDATE user_profile SET display_name = ?, email = ? WHERE username = ?");
        ps.setString(1, userProfile.getDisplayName());
        ps.setString(2, userProfile.getEmail());
        ps.setString(3, userProfile.getUsername());
        ps.executeQuery();
        connection.commit();
        connection.close();
        return userProfile;
    }

    public ComputerBuildDto createComputerBuildFromDraft(ComputerBuildDraftDto draft, String username) throws SQLException {
        java.util.Date currentDate = new java.util.Date();
        ComputerBuildDto.Builder builder = ComputerBuildDto.newBuilder()
            .setUuid(UUID.randomUUID().toString())
            .setDisplayName(draft.getDisplayName())
            .setDescription(draft.getDescription())
            .setUsername(username)
            .setCreationDate(currentDate.getTime())
            .setLastUpdateDate(currentDate.getTime());

        Connection connection = getConnection();
        builder.setCpuList(getCpuComponents(protocolStringListToArray(draft.getCpuIdsList()), connection));
        builder.setMotherboardList(getMotherboardComponents(protocolStringListToArray(draft.getMotherboardIdsList()), connection));
        builder.setMemoryList(getMemoryComponents(protocolStringListToArray(draft.getMemoryIdsList()), connection));
        builder.setStorageList(getStorageComponents(protocolStringListToArray(draft.getStorageIdsList()), connection));
        builder.setVideoCardList(getVideoCardComponents(protocolStringListToArray(draft.getVideoCardIdsList()), connection));
        builder.setPowerSupplyList(getPowerSupplyComponents(protocolStringListToArray(draft.getPowerSupplyIdsList()), connection));

        ComputerBuildDto newBuild = builder.build();
        String query = "INSERT INTO computer_build (id, display_name, creation_date, last_updated_date) VALUES (?, ?, ?, ?)";
        PreparedStatement ps = connection.prepareStatement(query);
        ps.setString(1, newBuild.getUuid());
        ps.setString(2, newBuild.getDisplayName());
        ps.setDate(3, new java.sql.Date(newBuild.getCreationDate()));
        ps.setDate(4, new java.sql.Date(newBuild.getLastUpdateDate()));
        ps.executeQuery();
        connection.commit();
        connection.close();
        logger.info(String.format("Created computer build %s", newBuild.getUuid()));
        return builder.build();
    }

    public List<ComputerBuildDto> getAllComputerBuilds(String[] buildIds, String username) throws SQLException {
        List<ComputerBuildDto> builds = new ArrayList<>();
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
            ComputerBuildDto build = ComputerBuildDto.newBuilder()
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

    public void updateComputerBuild(ComputerBuildDto build) throws SQLException {
        logger.info(String.format("Updated computer build %s", build.getUuid()));
    }

    public void deleteComputerBuild(String buildId) throws SQLException {
        logger.info(String.format("Deleted computer build %s", buildId));
    }

    public CpuComponentListDto getCpuComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        CpuComponentListDto componentListDto = getCpuComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    public MotherboardComponentListDto getMotherboardComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        MotherboardComponentListDto componentListDto = getMotherboardComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    public MemoryComponentListDto getMemoryComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        MemoryComponentListDto componentListDto = getMemoryComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    public StorageComponentListDto getStorageComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        StorageComponentListDto componentListDto = getStorageComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    public VideoCardComponentListDto getVideoCardComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        VideoCardComponentListDto componentListDto = getVideoCardComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    public PowerSupplyComponentListDto getPowerSupplyComponents(String[] componentIds) throws SQLException {
        Connection connection = getConnection();
        PowerSupplyComponentListDto componentListDto = getPowerSupplyComponents(componentIds, connection);
        connection.close();
        return componentListDto;
    }

    private CpuComponentListDto getCpuComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<CpuComponentDto> parseComponent = (ResultSet rs) -> CpuComponentDto.newBuilder()
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
        String queryString = formQueryWithIdsFilter("cpu", TableColumnNames.CPU_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<CpuComponentDto> components = getRowEntities(rs, parseComponent);
        return CpuComponentListDto.newBuilder().addAllCpuComponents(components).build();
    }

    private MotherboardComponentListDto getMotherboardComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<MotherboardComponentDto> parseComponent = (ResultSet rs) -> MotherboardComponentDto.newBuilder()
            .setUuid(rs.getString(TableColumnNames.ID))
            .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
            .setCpuSocket(rs.getString(TableColumnNames.CPU_SOCKET))
            .setFormFactor(rs.getString(TableColumnNames.FORM_FACTOR))
            .setMaxMemoryGigabytes(rs.getInt(TableColumnNames.MAX_MEMORY))
            .setNumMemorySlots(rs.getInt(TableColumnNames.NUM_MEMORY_SLOTS))
            .setColour(rs.getString(TableColumnNames.COLOUR))
            .setPrice(rs.getInt(TableColumnNames.PRICE))
            .build();
        String queryString = formQueryWithIdsFilter("motherboard", TableColumnNames.MOTHERBOARD_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<MotherboardComponentDto> components = getRowEntities(rs, parseComponent);
        return MotherboardComponentListDto.newBuilder().addAllMotherboardComponents(components).build();
    }

    private MemoryComponentListDto getMemoryComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<MemoryComponentDto> parseComponent = (ResultSet rs) -> MemoryComponentDto.newBuilder()
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
        String queryString = formQueryWithIdsFilter("memory", TableColumnNames.MEMORY_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<MemoryComponentDto> components = getRowEntities(rs, parseComponent);
        return MemoryComponentListDto.newBuilder().addAllMemoryComponents(components).build();
    }

    private StorageComponentListDto getStorageComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<StorageComponentDto> parseComponent = (ResultSet rs) -> StorageComponentDto.newBuilder()
            .setUuid(rs.getString(TableColumnNames.ID))
            .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
            .setCapacityGigabytes(rs.getInt(TableColumnNames.CAPACITY))
            .setType(rs.getString(TableColumnNames.TYPE))
            .setCacheSizeMegabytes(rs.getInt(TableColumnNames.CACHE_SIZE))
            .setFormFactor(rs.getString(TableColumnNames.FORM_FACTOR))
            .setInterface(rs.getString(TableColumnNames.INTERFACE))
            .setPrice(rs.getInt(TableColumnNames.PRICE))
            .build();
        String queryString = formQueryWithIdsFilter("storage", TableColumnNames.STORAGE_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<StorageComponentDto> components = getRowEntities(rs, parseComponent);
        return StorageComponentListDto.newBuilder().addAllStorageComponents(components).build();
    }

    private VideoCardComponentListDto getVideoCardComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<VideoCardComponentDto> parseComponent = (ResultSet rs) -> VideoCardComponentDto.newBuilder()
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
        String queryString = formQueryWithIdsFilter("video_card", TableColumnNames.VIDEO_CARD_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<VideoCardComponentDto> components = getRowEntities(rs, parseComponent);
        return VideoCardComponentListDto.newBuilder().addAllVideoCardComponents(components).build();
    }

    private PowerSupplyComponentListDto getPowerSupplyComponents(String[] componentIds, Connection connection) throws SQLException {
        ParseDatabaseEntities<PowerSupplyComponentDto> parseComponent = (ResultSet rs) ->
            PowerSupplyComponentDto.newBuilder()
                .setUuid(rs.getString(TableColumnNames.ID))
                .setDisplayName(rs.getString(TableColumnNames.DISPLAY_NAME))
                .setType(rs.getString(TableColumnNames.TYPE))
                .setEfficiency(rs.getString(TableColumnNames.EFFICIENCY))
                .setWattage(rs.getInt(TableColumnNames.WATTAGE))
                .setModular(rs.getString(TableColumnNames.MODULAR))
                .setColour(rs.getString(TableColumnNames.COLOUR))
                .setPrice(rs.getInt(TableColumnNames.PRICE))
                .build();
        String queryString = formQueryWithIdsFilter("power_supply", TableColumnNames.POWER_SUPPLY_COLUMNS, componentIds);
        PreparedStatement ps = connection.prepareStatement(queryString);
        ResultSet rs = ps.executeQuery();
        List<PowerSupplyComponentDto> components = getRowEntities(rs, parseComponent);
        return PowerSupplyComponentListDto.newBuilder().addAllPowerSupplyComponents(components).build();
    }

    private <T> List<T> getRowEntities(ResultSet rs,
                                       ParseDatabaseEntities<T> parseComponent) throws SQLException {
        List<T> components = new ArrayList<>();
        while (rs.next()) {
            components.add(parseComponent.apply(rs));
        }
        return components;
    }

    private String formQueryString(String tableName, String[] columns) {
        String columnString = String.join(", ", columns);
        return String.format("SELECT %s FROM %s", columnString, tableName);
    }

    private String formQueryWithIdsFilter(String tableName, String[] columns, String[] ids) {
        String queryString = formQueryString(tableName, columns);
        if (ids == null || ids.length == 0) {
            return queryString;
        }
        List<String> delimitedIds = new ArrayList<>();
        for (String id : ids) {
            String delimitedId = String.format("'%s'", id);
            delimitedIds.add(delimitedId);
        }
        String idSetString = String.join(",", delimitedIds);
        return String.format("%s WHERE id IN (%s)", queryString, idSetString);
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

interface ParseDatabaseEntities<T> {
    T apply(ResultSet rs) throws SQLException;
}
