package database;

import transfers.User.*;

import java.sql.*;

public class UserDatabase {
    private final ConnectionHandler connectionHandler;

    public UserDatabase(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    public UserProfile getUserProfile(String username) throws SQLException {
        UserProfile.Builder builder = UserProfile.newBuilder();
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("SELECT username, display_name, email FROM user_profile WHERE username = ?")) {
            ps.setString(1, username);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                builder
                    .setUsername(rs.getString("username"))
                    .setDisplayName(rs.getString("display_name"))
                    .setEmail(rs.getString("email"));
            }
        }
        return builder.build();
    }

    public UserProfile getUserProfile(String email, String password) throws SQLException {
        UserProfile.Builder builder = UserProfile.newBuilder();
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("SELECT username, display_name, email FROM user_profile WHERE email = ? AND password = ?")) {
            ps.setString(1, email);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                builder
                    .setUsername(rs.getString("username"))
                    .setDisplayName(rs.getString("display_name"))
                    .setEmail(rs.getString("email"));
            }
        }
        return builder.build();
    }

    public UserProfile updateUserProfile(UserProfile userProfile) throws SQLException {
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("UPDATE user_profile SET display_name = ?, email = ? WHERE username = ?")) {
            ps.setString(1, userProfile.getDisplayName());
            ps.setString(2, userProfile.getEmail());
            ps.setString(3, userProfile.getUsername());
            ps.executeQuery();
            connection.commit();
        }
        return userProfile;
    }
}
