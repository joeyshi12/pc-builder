package database;

import java.util.*;

final class QueryUtil {
    public static String formQueryWithIdsFilter(String tableName, String[] columns, String[] ids) {
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
