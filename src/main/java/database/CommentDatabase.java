package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import transfers.CommentOuterClass.*;

public class CommentDatabase {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final ConnectionHandler connectionHandler;

    public CommentDatabase(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    public Comment insertComment(Comment comment) throws Exception {
        String query = "INSERT INTO build_comment (id, username, build_id, content, creation_date, last_updated_date) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, comment.getUuid());
            ps.setString(2, comment.getUsername());
            ps.setString(3, comment.getBuildId());
            ps.setString(4, comment.getContent());
            ps.setTimestamp(5, new Timestamp(comment.getCreationDate()));
            ps.setTimestamp(6, new Timestamp(comment.getLastUpdateDate()));
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Created build comment %s", comment.getUuid()));
        }
        return comment;
    }

    public List<Comment> getComments(String buildId) throws Exception {
        List<Comment> comments = new ArrayList<Comment>();
        String query = new StringBuilder(QueryUtil.formTableSelectQuery("build_comment", TableColumnNames.COMMENT_COLUMNS))
            .append(" WHERE build_id = ?")
            .append(" ORDER BY last_updated_date DESC")
            .toString();
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, buildId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Comment comment = Comment.newBuilder()
                    .setUuid(rs.getString(TableColumnNames.ID))
                    .setUsername(rs.getString(TableColumnNames.USERNAME))
                    .setBuildId(rs.getString(TableColumnNames.BUILD_ID))
                    .setContent(rs.getString(TableColumnNames.CONTENT))
                    .setCreationDate(rs.getTimestamp(TableColumnNames.CREATION_DATE).getTime())
                    .setLastUpdateDate(rs.getTimestamp(TableColumnNames.LAST_UPDATED_DATE).getTime())
                    .build();
                comments.add(comment);
            }
        }
        return comments;
    }

    public void updateComment(Comment comment) throws Exception {
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("UPDATE build_comment SET content = ?, last_updated_date = ? WHERE id = ?")) {
            ps.setString(1, comment.getContent());
            ps.setTimestamp(2, new Timestamp(comment.getLastUpdateDate()));
            ps.setString(3, comment.getUuid());
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Updated build comment %s", comment.getUuid()));
        }
    }

    public void deleteComment(String commentId, String username) throws Exception {
        try (Connection connection = connectionHandler.getConnection();
             PreparedStatement ps = connection.prepareStatement("DELETE FROM build_comment WHERE id = ? AND username = ?")) {
            ps.setString(1, commentId);
            ps.setString(2, username);
            ps.executeQuery();
            connection.commit();
            logger.info(String.format("Deleted build comment %s", commentId));
        }
    }
}
