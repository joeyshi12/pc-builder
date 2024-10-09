package database;

final class QueryUtil {
    public static String formQueryWithIdsFilter(String tableName, String[] columns, String[] ids) throws Exception {
        if (columns.length == 0) {
            throw new Exception("No columns provided in query");
        }
        StringBuilder builder = new StringBuilder("SELECT ");
        builder.append(columns[0]);
        for (int i = 1; i < columns.length; i++) {
            builder.append(",").append(columns[i]);
        }
        builder.append(" FROM ").append(tableName);
        if (ids != null && ids.length > 0) {
            builder.append(" WHERE id IN (")
                .append(String.join(",", ids))
                .append(")");
        }
        return builder.toString();
    }
}
