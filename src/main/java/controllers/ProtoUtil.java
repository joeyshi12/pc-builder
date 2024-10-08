package controllers;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.MessageOrBuilder;
import com.google.protobuf.ProtocolStringList;
import com.google.protobuf.util.JsonFormat;

import java.util.*;

public final class ProtoUtil {
    public static <T extends MessageOrBuilder> String protoListToJsonString(List<T> messages) throws InvalidProtocolBufferException {
        if (messages.isEmpty()) {
            return "[]";
        }
        StringBuilder builder = new StringBuilder("[");
        for (int i = 0; i < messages.size() - 1; i++) {
            builder.append(JsonFormat.printer().print(messages.get(i)));
            builder.append(",");
        }
        builder.append(JsonFormat.printer().print(messages.get(messages.size() - 1)));
        builder.append("]");
        return builder.toString();
    }

    public static String[] protocolStringListToArray(ProtocolStringList strList) {
        String[] strArr = new String[strList.size()];
        Iterator<String> it = strList.listIterator();
        for (int i = 0; it.hasNext(); i++) {
            strArr[i] = it.next();
        }
        return strArr;
    }
}
