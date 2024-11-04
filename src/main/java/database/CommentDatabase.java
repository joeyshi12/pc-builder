package database;

import java.util.ArrayList;
import java.util.List;

import transfers.CommentOuterClass.*;

public class CommentDatabase {
    private final ConnectionHandler connectionHandler;

    public CommentDatabase(ConnectionHandler connectionHandler) {
        this.connectionHandler = connectionHandler;
    }

    public List<Comment> getComments() {
        return new ArrayList<Comment>();
    }
}
