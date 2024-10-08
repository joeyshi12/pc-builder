package database;

final class QueryUtil {
    public static String formQueryWithIdsFilter(String tableName, String[] columns, String[] ids) {
        StringBuilder builder = new StringBuilder("SELECT");
        for (String column : columns) {
            builder.append(" ");
            builder.append(column);
        }
        builder.append(" FROM ");
        builder.append(tableName);
        if (ids != null && ids.length > 0) {
            builder.append(" WHERE id IN (");
            builder.append(String.join(",", ids));
            builder.append(")");
        }
        return builder.toString();
    }
}
