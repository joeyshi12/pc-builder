// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.28.2
// source: transfers/comment.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "transfers";

export interface Comment {
  uuid?: string | undefined;
  username?: string | undefined;
  buildId?: string | undefined;
  content?: string | undefined;
  creationDate?: number | undefined;
  lastUpdateDate?: number | undefined;
}

function createBaseComment(): Comment {
  return { uuid: "", username: "", buildId: "", content: "", creationDate: 0, lastUpdateDate: 0 };
}

export const Comment = {
  encode(message: Comment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.buildId !== undefined && message.buildId !== "") {
      writer.uint32(26).string(message.buildId);
    }
    if (message.content !== undefined && message.content !== "") {
      writer.uint32(34).string(message.content);
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      writer.uint32(40).int64(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      writer.uint32(48).int64(message.lastUpdateDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Comment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.uuid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.username = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.buildId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.content = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.creationDate = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.lastUpdateDate = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Comment {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      buildId: isSet(object.buildId) ? globalThis.String(object.buildId) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      creationDate: isSet(object.creationDate) ? globalThis.Number(object.creationDate) : 0,
      lastUpdateDate: isSet(object.lastUpdateDate) ? globalThis.Number(object.lastUpdateDate) : 0,
    };
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.username !== undefined && message.username !== "") {
      obj.username = message.username;
    }
    if (message.buildId !== undefined && message.buildId !== "") {
      obj.buildId = message.buildId;
    }
    if (message.content !== undefined && message.content !== "") {
      obj.content = message.content;
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      obj.creationDate = Math.round(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      obj.lastUpdateDate = Math.round(message.lastUpdateDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Comment>, I>>(base?: I): Comment {
    return Comment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Comment>, I>>(object: I): Comment {
    const message = createBaseComment();
    message.uuid = object.uuid ?? "";
    message.username = object.username ?? "";
    message.buildId = object.buildId ?? "";
    message.content = object.content ?? "";
    message.creationDate = object.creationDate ?? 0;
    message.lastUpdateDate = object.lastUpdateDate ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}