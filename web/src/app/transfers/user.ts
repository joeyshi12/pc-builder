/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "transfers";

export interface UserProfile {
  username?: string | undefined;
  displayName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface Comment {
  authorName?: string | undefined;
  content?: string | undefined;
  lastUpdatedDate?: string | undefined;
}

function createBaseUserProfile(): UserProfile {
  return { username: "", displayName: "", email: "", password: "" };
}

export const UserProfile = {
  encode(message: UserProfile, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.email !== undefined && message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.password !== undefined && message.password !== "") {
      writer.uint32(34).string(message.password);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserProfile {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.password = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserProfile {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserProfile): unknown {
    const obj: any = {};
    if (message.username !== undefined && message.username !== "") {
      obj.username = message.username;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.email !== undefined && message.email !== "") {
      obj.email = message.email;
    }
    if (message.password !== undefined && message.password !== "") {
      obj.password = message.password;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserProfile>, I>>(base?: I): UserProfile {
    return UserProfile.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserProfile>, I>>(object: I): UserProfile {
    const message = createBaseUserProfile();
    message.username = object.username ?? "";
    message.displayName = object.displayName ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseComment(): Comment {
  return { authorName: "", content: "", lastUpdatedDate: "" };
}

export const Comment = {
  encode(message: Comment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.authorName !== undefined && message.authorName !== "") {
      writer.uint32(10).string(message.authorName);
    }
    if (message.content !== undefined && message.content !== "") {
      writer.uint32(18).string(message.content);
    }
    if (message.lastUpdatedDate !== undefined && message.lastUpdatedDate !== "") {
      writer.uint32(34).string(message.lastUpdatedDate);
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

          message.authorName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.lastUpdatedDate = reader.string();
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
      authorName: isSet(object.authorName) ? globalThis.String(object.authorName) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      lastUpdatedDate: isSet(object.lastUpdatedDate) ? globalThis.String(object.lastUpdatedDate) : "",
    };
  },

  toJSON(message: Comment): unknown {
    const obj: any = {};
    if (message.authorName !== undefined && message.authorName !== "") {
      obj.authorName = message.authorName;
    }
    if (message.content !== undefined && message.content !== "") {
      obj.content = message.content;
    }
    if (message.lastUpdatedDate !== undefined && message.lastUpdatedDate !== "") {
      obj.lastUpdatedDate = message.lastUpdatedDate;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Comment>, I>>(base?: I): Comment {
    return Comment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Comment>, I>>(object: I): Comment {
    const message = createBaseComment();
    message.authorName = object.authorName ?? "";
    message.content = object.content ?? "";
    message.lastUpdatedDate = object.lastUpdatedDate ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
