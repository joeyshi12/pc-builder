package controllers;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.MessageOrBuilder;
import com.google.protobuf.util.JsonFormat;

import java.util.*;

public final class ProtoUtil {
    public static <T extends MessageOrBuilder> String protoListToJsonString(List<T> messages) throws InvalidProtocolBufferException {
        if (messages.isEmpty()) {
            return "[]";
        }
        StringBuilder builder = new StringBuilder("[").append(JsonFormat.printer().print(messages.get(0)));
        for (int i = 1; i < messages.size(); i++) {
            builder.append(",").append(JsonFormat.printer().print(messages.get(i)));
        }
        return builder.append("]").toString();
    }
}
