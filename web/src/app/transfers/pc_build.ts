/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import {
  CpuComponent,
  MemoryComponent,
  MotherboardComponent,
  PowerSupplyComponent,
  StorageComponent,
  VideoCardComponent,
} from "./pc_component";

export const protobufPackage = "transfers";

export interface PcBuild {
  uuid?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  username?: string | undefined;
  cpuList?: CpuComponent[] | undefined;
  motherboardList?: MotherboardComponent[] | undefined;
  storageList?: StorageComponent[] | undefined;
  memoryList?: MemoryComponent[] | undefined;
  videoCardList?: VideoCardComponent[] | undefined;
  powerSupplyList?: PowerSupplyComponent[] | undefined;
  creationDate?: number | undefined;
  lastUpdateDate?: number | undefined;
}

export interface PcBuildDraft {
  displayName?: string | undefined;
  description?: string | undefined;
  cpuIds?: string[] | undefined;
  motherboardIds?: string[] | undefined;
  storageIds?: string[] | undefined;
  memoryIds?: string[] | undefined;
  videoCardIds?: string[] | undefined;
  powerSupplyIds?: string[] | undefined;
}

function createBasePcBuild(): PcBuild {
  return {
    uuid: "",
    displayName: "",
    description: "",
    username: "",
    cpuList: [],
    motherboardList: [],
    storageList: [],
    memoryList: [],
    videoCardList: [],
    powerSupplyList: [],
    creationDate: 0,
    lastUpdateDate: 0,
  };
}

export const PcBuild = {
  encode(message: PcBuild, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.username !== undefined && message.username !== "") {
      writer.uint32(34).string(message.username);
    }
    if (message.cpuList !== undefined && message.cpuList.length !== 0) {
      for (const v of message.cpuList) {
        CpuComponent.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.motherboardList !== undefined && message.motherboardList.length !== 0) {
      for (const v of message.motherboardList) {
        MotherboardComponent.encode(v!, writer.uint32(50).fork()).ldelim();
      }
    }
    if (message.storageList !== undefined && message.storageList.length !== 0) {
      for (const v of message.storageList) {
        StorageComponent.encode(v!, writer.uint32(58).fork()).ldelim();
      }
    }
    if (message.memoryList !== undefined && message.memoryList.length !== 0) {
      for (const v of message.memoryList) {
        MemoryComponent.encode(v!, writer.uint32(66).fork()).ldelim();
      }
    }
    if (message.videoCardList !== undefined && message.videoCardList.length !== 0) {
      for (const v of message.videoCardList) {
        VideoCardComponent.encode(v!, writer.uint32(74).fork()).ldelim();
      }
    }
    if (message.powerSupplyList !== undefined && message.powerSupplyList.length !== 0) {
      for (const v of message.powerSupplyList) {
        PowerSupplyComponent.encode(v!, writer.uint32(82).fork()).ldelim();
      }
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      writer.uint32(88).int64(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      writer.uint32(96).int64(message.lastUpdateDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PcBuild {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePcBuild();
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

          message.displayName = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.username = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.cpuList!.push(CpuComponent.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.motherboardList!.push(MotherboardComponent.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.storageList!.push(StorageComponent.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.memoryList!.push(MemoryComponent.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.videoCardList!.push(VideoCardComponent.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.powerSupplyList!.push(PowerSupplyComponent.decode(reader, reader.uint32()));
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.creationDate = longToNumber(reader.int64() as Long);
          continue;
        case 12:
          if (tag !== 96) {
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

  fromJSON(object: any): PcBuild {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      cpuList: globalThis.Array.isArray(object?.cpuList)
        ? object.cpuList.map((e: any) => CpuComponent.fromJSON(e))
        : [],
      motherboardList: globalThis.Array.isArray(object?.motherboardList)
        ? object.motherboardList.map((e: any) => MotherboardComponent.fromJSON(e))
        : [],
      storageList: globalThis.Array.isArray(object?.storageList)
        ? object.storageList.map((e: any) => StorageComponent.fromJSON(e))
        : [],
      memoryList: globalThis.Array.isArray(object?.memoryList)
        ? object.memoryList.map((e: any) => MemoryComponent.fromJSON(e))
        : [],
      videoCardList: globalThis.Array.isArray(object?.videoCardList)
        ? object.videoCardList.map((e: any) => VideoCardComponent.fromJSON(e))
        : [],
      powerSupplyList: globalThis.Array.isArray(object?.powerSupplyList)
        ? object.powerSupplyList.map((e: any) => PowerSupplyComponent.fromJSON(e))
        : [],
      creationDate: isSet(object.creationDate) ? globalThis.Number(object.creationDate) : 0,
      lastUpdateDate: isSet(object.lastUpdateDate) ? globalThis.Number(object.lastUpdateDate) : 0,
    };
  },

  toJSON(message: PcBuild): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.username !== undefined && message.username !== "") {
      obj.username = message.username;
    }
    if (message.cpuList?.length) {
      obj.cpuList = message.cpuList.map((e) => CpuComponent.toJSON(e));
    }
    if (message.motherboardList?.length) {
      obj.motherboardList = message.motherboardList.map((e) => MotherboardComponent.toJSON(e));
    }
    if (message.storageList?.length) {
      obj.storageList = message.storageList.map((e) => StorageComponent.toJSON(e));
    }
    if (message.memoryList?.length) {
      obj.memoryList = message.memoryList.map((e) => MemoryComponent.toJSON(e));
    }
    if (message.videoCardList?.length) {
      obj.videoCardList = message.videoCardList.map((e) => VideoCardComponent.toJSON(e));
    }
    if (message.powerSupplyList?.length) {
      obj.powerSupplyList = message.powerSupplyList.map((e) => PowerSupplyComponent.toJSON(e));
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      obj.creationDate = Math.round(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      obj.lastUpdateDate = Math.round(message.lastUpdateDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PcBuild>, I>>(base?: I): PcBuild {
    return PcBuild.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PcBuild>, I>>(object: I): PcBuild {
    const message = createBasePcBuild();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.username = object.username ?? "";
    message.cpuList = object.cpuList?.map((e) => CpuComponent.fromPartial(e)) || [];
    message.motherboardList = object.motherboardList?.map((e) => MotherboardComponent.fromPartial(e)) || [];
    message.storageList = object.storageList?.map((e) => StorageComponent.fromPartial(e)) || [];
    message.memoryList = object.memoryList?.map((e) => MemoryComponent.fromPartial(e)) || [];
    message.videoCardList = object.videoCardList?.map((e) => VideoCardComponent.fromPartial(e)) || [];
    message.powerSupplyList = object.powerSupplyList?.map((e) => PowerSupplyComponent.fromPartial(e)) || [];
    message.creationDate = object.creationDate ?? 0;
    message.lastUpdateDate = object.lastUpdateDate ?? 0;
    return message;
  },
};

function createBasePcBuildDraft(): PcBuildDraft {
  return {
    displayName: "",
    description: "",
    cpuIds: [],
    motherboardIds: [],
    storageIds: [],
    memoryIds: [],
    videoCardIds: [],
    powerSupplyIds: [],
  };
}

export const PcBuildDraft = {
  encode(message: PcBuildDraft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(10).string(message.displayName);
    }
    if (message.description !== undefined && message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.cpuIds !== undefined && message.cpuIds.length !== 0) {
      for (const v of message.cpuIds) {
        writer.uint32(26).string(v!);
      }
    }
    if (message.motherboardIds !== undefined && message.motherboardIds.length !== 0) {
      for (const v of message.motherboardIds) {
        writer.uint32(34).string(v!);
      }
    }
    if (message.storageIds !== undefined && message.storageIds.length !== 0) {
      for (const v of message.storageIds) {
        writer.uint32(42).string(v!);
      }
    }
    if (message.memoryIds !== undefined && message.memoryIds.length !== 0) {
      for (const v of message.memoryIds) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.videoCardIds !== undefined && message.videoCardIds.length !== 0) {
      for (const v of message.videoCardIds) {
        writer.uint32(58).string(v!);
      }
    }
    if (message.powerSupplyIds !== undefined && message.powerSupplyIds.length !== 0) {
      for (const v of message.powerSupplyIds) {
        writer.uint32(66).string(v!);
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PcBuildDraft {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePcBuildDraft();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.displayName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.cpuIds!.push(reader.string());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.motherboardIds!.push(reader.string());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.storageIds!.push(reader.string());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.memoryIds!.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.videoCardIds!.push(reader.string());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.powerSupplyIds!.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PcBuildDraft {
    return {
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      cpuIds: globalThis.Array.isArray(object?.cpuIds) ? object.cpuIds.map((e: any) => globalThis.String(e)) : [],
      motherboardIds: globalThis.Array.isArray(object?.motherboardIds)
        ? object.motherboardIds.map((e: any) => globalThis.String(e))
        : [],
      storageIds: globalThis.Array.isArray(object?.storageIds)
        ? object.storageIds.map((e: any) => globalThis.String(e))
        : [],
      memoryIds: globalThis.Array.isArray(object?.memoryIds)
        ? object.memoryIds.map((e: any) => globalThis.String(e))
        : [],
      videoCardIds: globalThis.Array.isArray(object?.videoCardIds)
        ? object.videoCardIds.map((e: any) => globalThis.String(e))
        : [],
      powerSupplyIds: globalThis.Array.isArray(object?.powerSupplyIds)
        ? object.powerSupplyIds.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: PcBuildDraft): unknown {
    const obj: any = {};
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.description !== undefined && message.description !== "") {
      obj.description = message.description;
    }
    if (message.cpuIds?.length) {
      obj.cpuIds = message.cpuIds;
    }
    if (message.motherboardIds?.length) {
      obj.motherboardIds = message.motherboardIds;
    }
    if (message.storageIds?.length) {
      obj.storageIds = message.storageIds;
    }
    if (message.memoryIds?.length) {
      obj.memoryIds = message.memoryIds;
    }
    if (message.videoCardIds?.length) {
      obj.videoCardIds = message.videoCardIds;
    }
    if (message.powerSupplyIds?.length) {
      obj.powerSupplyIds = message.powerSupplyIds;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PcBuildDraft>, I>>(base?: I): PcBuildDraft {
    return PcBuildDraft.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PcBuildDraft>, I>>(object: I): PcBuildDraft {
    const message = createBasePcBuildDraft();
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.cpuIds = object.cpuIds?.map((e) => e) || [];
    message.motherboardIds = object.motherboardIds?.map((e) => e) || [];
    message.storageIds = object.storageIds?.map((e) => e) || [];
    message.memoryIds = object.memoryIds?.map((e) => e) || [];
    message.videoCardIds = object.videoCardIds?.map((e) => e) || [];
    message.powerSupplyIds = object.powerSupplyIds?.map((e) => e) || [];
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
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
