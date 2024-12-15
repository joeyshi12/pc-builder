package database;

import java.util.*;

final class QueryUtil {
    public static String formQueryWithIdCondition(String tableName, String[] columns, Optional<String[]> idsOpt) throws Exception {
        StringBuilder builder = new StringBuilder(formTableSelectQuery(tableName, columns));
        if (idsOpt.isPresent() && idsOpt.get().length > 0) {
            builder.append(" WHERE ").append(formIdCondition(idsOpt.get()));
        }
        return builder.toString();
    }

    public static String formTableSelectQuery(String tableName, String[] columns) throws Exception {
        if (columns.length == 0) {
            throw new Exception("No columns provided in query");
        }
        StringBuilder builder = new StringBuilder("SELECT ").append(columns[0]);
        for (int i = 1; i < columns.length; i++) {
            builder.append(",").append(columns[i]);
        }
        return builder.append(" FROM ").append(tableName).toString();
    }

    public static String formIdCondition(String[] ids) throws Exception {
        if (ids.length == 0) {
            throw new Exception("No IDs in ID condition");
        }
        StringBuilder builder = new StringBuilder("id IN ('").append(ids[0]).append("'");
        for (int i = 1; i < ids.length; i++) {
            builder.append(",'").append(ids[i]).append("'");
        }
        return builder.append(")").toString();
    }
}
