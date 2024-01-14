/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "models";

export interface UserProfileDto {
  username?: string | undefined;
  displayName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface CpuComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  coreCount?: number | undefined;
  coreClock?: number | undefined;
  boostClock?: number | undefined;
  tdp?: number | undefined;
  integratedGraphics?: string | undefined;
  hasSmt?: boolean | undefined;
  price?: number | undefined;
}

export interface CpuComponentListDto {
  cpuComponents?: CpuComponentDto[] | undefined;
}

export interface MotherboardComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  cpuSocket?: string | undefined;
  formFactor?: string | undefined;
  maxMemoryGigabytes?: number | undefined;
  numMemorySlots?: number | undefined;
  colour?: string | undefined;
  price?: number | undefined;
}

export interface MotherboardComponentListDto {
  motherboardComponents?: MotherboardComponentDto[] | undefined;
}

export interface MemoryComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  ddrVersion?: number | undefined;
  ddrClock?: number | undefined;
  numModules?: number | undefined;
  moduleSizeGigabytes?: number | undefined;
  colour?: string | undefined;
  firstWordLatency?: number | undefined;
  casLatency?: number | undefined;
  price?: number | undefined;
}

export interface MemoryComponentListDto {
  memoryComponents?: MemoryComponentDto[] | undefined;
}

export interface StorageComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  capacityGigabytes?: number | undefined;
  type?: string | undefined;
  cacheSizeMegabytes?: number | undefined;
  formFactor?: string | undefined;
  interface?: string | undefined;
  price?: number | undefined;
}

export interface StorageComponentListDto {
  storageComponents?: StorageComponentDto[] | undefined;
}

export interface VideoCardComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  chipset?: string | undefined;
  memoryGigabytes?: number | undefined;
  coreClock?: number | undefined;
  boostClock?: number | undefined;
  colour?: string | undefined;
  lengthMillimeters?: number | undefined;
  price?: number | undefined;
}

export interface VideoCardComponentListDto {
  videoCardComponents?: VideoCardComponentDto[] | undefined;
}

export interface PowerSupplyComponentDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  type?: string | undefined;
  efficiency?: string | undefined;
  wattage?: number | undefined;
  modular?: string | undefined;
  colour?: string | undefined;
  price?: number | undefined;
}

export interface PowerSupplyComponentListDto {
  powerSupplyComponents?: PowerSupplyComponentDto[] | undefined;
}

export interface ComputerBuildDto {
  uuid?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  username?: string | undefined;
  cpuList?: CpuComponentListDto | undefined;
  motherboardList?: MotherboardComponentListDto | undefined;
  storageList?: StorageComponentListDto | undefined;
  memoryList?: MemoryComponentListDto | undefined;
  videoCardList?: VideoCardComponentListDto | undefined;
  powerSupplyList?: PowerSupplyComponentListDto | undefined;
  creationDate?: number | undefined;
  lastUpdateDate?: number | undefined;
}

export interface ComputerBuildListDto {
  computerBuilds?: ComputerBuildDto[] | undefined;
}

export interface ComputerBuildCommentDto {
  authorName?: string | undefined;
  content?: string | undefined;
  lastUpdatedDate?: string | undefined;
}

export interface ComputerBuildDraftDto {
  displayName?: string | undefined;
  description?: string | undefined;
  cpuIds?: string[] | undefined;
  motherboardIds?: string[] | undefined;
  storageIds?: string[] | undefined;
  memoryIds?: string[] | undefined;
  videoCardIds?: string[] | undefined;
  powerSupplyIds?: string[] | undefined;
}

function createBaseUserProfileDto(): UserProfileDto {
  return { username: "", displayName: "", email: "", password: "" };
}

export const UserProfileDto = {
  encode(message: UserProfileDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): UserProfileDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserProfileDto();
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

  fromJSON(object: any): UserProfileDto {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
    };
  },

  toJSON(message: UserProfileDto): unknown {
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

  create<I extends Exact<DeepPartial<UserProfileDto>, I>>(base?: I): UserProfileDto {
    return UserProfileDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserProfileDto>, I>>(object: I): UserProfileDto {
    const message = createBaseUserProfileDto();
    message.username = object.username ?? "";
    message.displayName = object.displayName ?? "";
    message.email = object.email ?? "";
    message.password = object.password ?? "";
    return message;
  },
};

function createBaseCpuComponentDto(): CpuComponentDto {
  return {
    uuid: "",
    displayName: "",
    coreCount: 0,
    coreClock: 0,
    boostClock: 0,
    tdp: 0,
    integratedGraphics: "",
    hasSmt: false,
    price: 0,
  };
}

export const CpuComponentDto = {
  encode(message: CpuComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.coreCount !== undefined && message.coreCount !== 0) {
      writer.uint32(24).int32(message.coreCount);
    }
    if (message.coreClock !== undefined && message.coreClock !== 0) {
      writer.uint32(32).int32(message.coreClock);
    }
    if (message.boostClock !== undefined && message.boostClock !== 0) {
      writer.uint32(40).int32(message.boostClock);
    }
    if (message.tdp !== undefined && message.tdp !== 0) {
      writer.uint32(48).int32(message.tdp);
    }
    if (message.integratedGraphics !== undefined && message.integratedGraphics !== "") {
      writer.uint32(58).string(message.integratedGraphics);
    }
    if (message.hasSmt === true) {
      writer.uint32(64).bool(message.hasSmt);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(72).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CpuComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCpuComponentDto();
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
          if (tag !== 24) {
            break;
          }

          message.coreCount = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.coreClock = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.boostClock = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.tdp = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.integratedGraphics = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.hasSmt = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CpuComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      coreCount: isSet(object.coreCount) ? globalThis.Number(object.coreCount) : 0,
      coreClock: isSet(object.coreClock) ? globalThis.Number(object.coreClock) : 0,
      boostClock: isSet(object.boostClock) ? globalThis.Number(object.boostClock) : 0,
      tdp: isSet(object.tdp) ? globalThis.Number(object.tdp) : 0,
      integratedGraphics: isSet(object.integratedGraphics) ? globalThis.String(object.integratedGraphics) : "",
      hasSmt: isSet(object.hasSmt) ? globalThis.Boolean(object.hasSmt) : false,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: CpuComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.coreCount !== undefined && message.coreCount !== 0) {
      obj.coreCount = Math.round(message.coreCount);
    }
    if (message.coreClock !== undefined && message.coreClock !== 0) {
      obj.coreClock = Math.round(message.coreClock);
    }
    if (message.boostClock !== undefined && message.boostClock !== 0) {
      obj.boostClock = Math.round(message.boostClock);
    }
    if (message.tdp !== undefined && message.tdp !== 0) {
      obj.tdp = Math.round(message.tdp);
    }
    if (message.integratedGraphics !== undefined && message.integratedGraphics !== "") {
      obj.integratedGraphics = message.integratedGraphics;
    }
    if (message.hasSmt === true) {
      obj.hasSmt = message.hasSmt;
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CpuComponentDto>, I>>(base?: I): CpuComponentDto {
    return CpuComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CpuComponentDto>, I>>(object: I): CpuComponentDto {
    const message = createBaseCpuComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.coreCount = object.coreCount ?? 0;
    message.coreClock = object.coreClock ?? 0;
    message.boostClock = object.boostClock ?? 0;
    message.tdp = object.tdp ?? 0;
    message.integratedGraphics = object.integratedGraphics ?? "";
    message.hasSmt = object.hasSmt ?? false;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseCpuComponentListDto(): CpuComponentListDto {
  return { cpuComponents: [] };
}

export const CpuComponentListDto = {
  encode(message: CpuComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuComponents !== undefined && message.cpuComponents.length !== 0) {
      for (const v of message.cpuComponents) {
        CpuComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CpuComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCpuComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cpuComponents!.push(CpuComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CpuComponentListDto {
    return {
      cpuComponents: globalThis.Array.isArray(object?.cpuComponents)
        ? object.cpuComponents.map((e: any) => CpuComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CpuComponentListDto): unknown {
    const obj: any = {};
    if (message.cpuComponents?.length) {
      obj.cpuComponents = message.cpuComponents.map((e) => CpuComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CpuComponentListDto>, I>>(base?: I): CpuComponentListDto {
    return CpuComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CpuComponentListDto>, I>>(object: I): CpuComponentListDto {
    const message = createBaseCpuComponentListDto();
    message.cpuComponents = object.cpuComponents?.map((e) => CpuComponentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMotherboardComponentDto(): MotherboardComponentDto {
  return {
    uuid: "",
    displayName: "",
    cpuSocket: "",
    formFactor: "",
    maxMemoryGigabytes: 0,
    numMemorySlots: 0,
    colour: "",
    price: 0,
  };
}

export const MotherboardComponentDto = {
  encode(message: MotherboardComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.cpuSocket !== undefined && message.cpuSocket !== "") {
      writer.uint32(26).string(message.cpuSocket);
    }
    if (message.formFactor !== undefined && message.formFactor !== "") {
      writer.uint32(34).string(message.formFactor);
    }
    if (message.maxMemoryGigabytes !== undefined && message.maxMemoryGigabytes !== 0) {
      writer.uint32(40).int32(message.maxMemoryGigabytes);
    }
    if (message.numMemorySlots !== undefined && message.numMemorySlots !== 0) {
      writer.uint32(48).int32(message.numMemorySlots);
    }
    if (message.colour !== undefined && message.colour !== "") {
      writer.uint32(58).string(message.colour);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(64).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MotherboardComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMotherboardComponentDto();
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

          message.cpuSocket = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.formFactor = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxMemoryGigabytes = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.numMemorySlots = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.colour = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MotherboardComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      cpuSocket: isSet(object.cpuSocket) ? globalThis.String(object.cpuSocket) : "",
      formFactor: isSet(object.formFactor) ? globalThis.String(object.formFactor) : "",
      maxMemoryGigabytes: isSet(object.maxMemoryGigabytes) ? globalThis.Number(object.maxMemoryGigabytes) : 0,
      numMemorySlots: isSet(object.numMemorySlots) ? globalThis.Number(object.numMemorySlots) : 0,
      colour: isSet(object.colour) ? globalThis.String(object.colour) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: MotherboardComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.cpuSocket !== undefined && message.cpuSocket !== "") {
      obj.cpuSocket = message.cpuSocket;
    }
    if (message.formFactor !== undefined && message.formFactor !== "") {
      obj.formFactor = message.formFactor;
    }
    if (message.maxMemoryGigabytes !== undefined && message.maxMemoryGigabytes !== 0) {
      obj.maxMemoryGigabytes = Math.round(message.maxMemoryGigabytes);
    }
    if (message.numMemorySlots !== undefined && message.numMemorySlots !== 0) {
      obj.numMemorySlots = Math.round(message.numMemorySlots);
    }
    if (message.colour !== undefined && message.colour !== "") {
      obj.colour = message.colour;
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MotherboardComponentDto>, I>>(base?: I): MotherboardComponentDto {
    return MotherboardComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MotherboardComponentDto>, I>>(object: I): MotherboardComponentDto {
    const message = createBaseMotherboardComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.cpuSocket = object.cpuSocket ?? "";
    message.formFactor = object.formFactor ?? "";
    message.maxMemoryGigabytes = object.maxMemoryGigabytes ?? 0;
    message.numMemorySlots = object.numMemorySlots ?? 0;
    message.colour = object.colour ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseMotherboardComponentListDto(): MotherboardComponentListDto {
  return { motherboardComponents: [] };
}

export const MotherboardComponentListDto = {
  encode(message: MotherboardComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.motherboardComponents !== undefined && message.motherboardComponents.length !== 0) {
      for (const v of message.motherboardComponents) {
        MotherboardComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MotherboardComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMotherboardComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.motherboardComponents!.push(MotherboardComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MotherboardComponentListDto {
    return {
      motherboardComponents: globalThis.Array.isArray(object?.motherboardComponents)
        ? object.motherboardComponents.map((e: any) => MotherboardComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MotherboardComponentListDto): unknown {
    const obj: any = {};
    if (message.motherboardComponents?.length) {
      obj.motherboardComponents = message.motherboardComponents.map((e) => MotherboardComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MotherboardComponentListDto>, I>>(base?: I): MotherboardComponentListDto {
    return MotherboardComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MotherboardComponentListDto>, I>>(object: I): MotherboardComponentListDto {
    const message = createBaseMotherboardComponentListDto();
    message.motherboardComponents = object.motherboardComponents?.map((e) => MotherboardComponentDto.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseMemoryComponentDto(): MemoryComponentDto {
  return {
    uuid: "",
    displayName: "",
    ddrVersion: 0,
    ddrClock: 0,
    numModules: 0,
    moduleSizeGigabytes: 0,
    colour: "",
    firstWordLatency: 0,
    casLatency: 0,
    price: 0,
  };
}

export const MemoryComponentDto = {
  encode(message: MemoryComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.ddrVersion !== undefined && message.ddrVersion !== 0) {
      writer.uint32(24).int32(message.ddrVersion);
    }
    if (message.ddrClock !== undefined && message.ddrClock !== 0) {
      writer.uint32(32).int32(message.ddrClock);
    }
    if (message.numModules !== undefined && message.numModules !== 0) {
      writer.uint32(40).int32(message.numModules);
    }
    if (message.moduleSizeGigabytes !== undefined && message.moduleSizeGigabytes !== 0) {
      writer.uint32(48).int32(message.moduleSizeGigabytes);
    }
    if (message.colour !== undefined && message.colour !== "") {
      writer.uint32(58).string(message.colour);
    }
    if (message.firstWordLatency !== undefined && message.firstWordLatency !== 0) {
      writer.uint32(64).int32(message.firstWordLatency);
    }
    if (message.casLatency !== undefined && message.casLatency !== 0) {
      writer.uint32(72).int32(message.casLatency);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(80).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemoryComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemoryComponentDto();
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
          if (tag !== 24) {
            break;
          }

          message.ddrVersion = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.ddrClock = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.numModules = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.moduleSizeGigabytes = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.colour = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.firstWordLatency = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.casLatency = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemoryComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      ddrVersion: isSet(object.ddrVersion) ? globalThis.Number(object.ddrVersion) : 0,
      ddrClock: isSet(object.ddrClock) ? globalThis.Number(object.ddrClock) : 0,
      numModules: isSet(object.numModules) ? globalThis.Number(object.numModules) : 0,
      moduleSizeGigabytes: isSet(object.moduleSizeGigabytes) ? globalThis.Number(object.moduleSizeGigabytes) : 0,
      colour: isSet(object.colour) ? globalThis.String(object.colour) : "",
      firstWordLatency: isSet(object.firstWordLatency) ? globalThis.Number(object.firstWordLatency) : 0,
      casLatency: isSet(object.casLatency) ? globalThis.Number(object.casLatency) : 0,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: MemoryComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.ddrVersion !== undefined && message.ddrVersion !== 0) {
      obj.ddrVersion = Math.round(message.ddrVersion);
    }
    if (message.ddrClock !== undefined && message.ddrClock !== 0) {
      obj.ddrClock = Math.round(message.ddrClock);
    }
    if (message.numModules !== undefined && message.numModules !== 0) {
      obj.numModules = Math.round(message.numModules);
    }
    if (message.moduleSizeGigabytes !== undefined && message.moduleSizeGigabytes !== 0) {
      obj.moduleSizeGigabytes = Math.round(message.moduleSizeGigabytes);
    }
    if (message.colour !== undefined && message.colour !== "") {
      obj.colour = message.colour;
    }
    if (message.firstWordLatency !== undefined && message.firstWordLatency !== 0) {
      obj.firstWordLatency = Math.round(message.firstWordLatency);
    }
    if (message.casLatency !== undefined && message.casLatency !== 0) {
      obj.casLatency = Math.round(message.casLatency);
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemoryComponentDto>, I>>(base?: I): MemoryComponentDto {
    return MemoryComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemoryComponentDto>, I>>(object: I): MemoryComponentDto {
    const message = createBaseMemoryComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.ddrVersion = object.ddrVersion ?? 0;
    message.ddrClock = object.ddrClock ?? 0;
    message.numModules = object.numModules ?? 0;
    message.moduleSizeGigabytes = object.moduleSizeGigabytes ?? 0;
    message.colour = object.colour ?? "";
    message.firstWordLatency = object.firstWordLatency ?? 0;
    message.casLatency = object.casLatency ?? 0;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseMemoryComponentListDto(): MemoryComponentListDto {
  return { memoryComponents: [] };
}

export const MemoryComponentListDto = {
  encode(message: MemoryComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memoryComponents !== undefined && message.memoryComponents.length !== 0) {
      for (const v of message.memoryComponents) {
        MemoryComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemoryComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemoryComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memoryComponents!.push(MemoryComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemoryComponentListDto {
    return {
      memoryComponents: globalThis.Array.isArray(object?.memoryComponents)
        ? object.memoryComponents.map((e: any) => MemoryComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MemoryComponentListDto): unknown {
    const obj: any = {};
    if (message.memoryComponents?.length) {
      obj.memoryComponents = message.memoryComponents.map((e) => MemoryComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemoryComponentListDto>, I>>(base?: I): MemoryComponentListDto {
    return MemoryComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemoryComponentListDto>, I>>(object: I): MemoryComponentListDto {
    const message = createBaseMemoryComponentListDto();
    message.memoryComponents = object.memoryComponents?.map((e) => MemoryComponentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageComponentDto(): StorageComponentDto {
  return {
    uuid: "",
    displayName: "",
    capacityGigabytes: 0,
    type: "",
    cacheSizeMegabytes: 0,
    formFactor: "",
    interface: "",
    price: 0,
  };
}

export const StorageComponentDto = {
  encode(message: StorageComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.capacityGigabytes !== undefined && message.capacityGigabytes !== 0) {
      writer.uint32(24).int32(message.capacityGigabytes);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(34).string(message.type);
    }
    if (message.cacheSizeMegabytes !== undefined && message.cacheSizeMegabytes !== 0) {
      writer.uint32(40).int32(message.cacheSizeMegabytes);
    }
    if (message.formFactor !== undefined && message.formFactor !== "") {
      writer.uint32(50).string(message.formFactor);
    }
    if (message.interface !== undefined && message.interface !== "") {
      writer.uint32(58).string(message.interface);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(64).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageComponentDto();
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
          if (tag !== 24) {
            break;
          }

          message.capacityGigabytes = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.type = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.cacheSizeMegabytes = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.formFactor = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.interface = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      capacityGigabytes: isSet(object.capacityGigabytes) ? globalThis.Number(object.capacityGigabytes) : 0,
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      cacheSizeMegabytes: isSet(object.cacheSizeMegabytes) ? globalThis.Number(object.cacheSizeMegabytes) : 0,
      formFactor: isSet(object.formFactor) ? globalThis.String(object.formFactor) : "",
      interface: isSet(object.interface) ? globalThis.String(object.interface) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: StorageComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.capacityGigabytes !== undefined && message.capacityGigabytes !== 0) {
      obj.capacityGigabytes = Math.round(message.capacityGigabytes);
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.cacheSizeMegabytes !== undefined && message.cacheSizeMegabytes !== 0) {
      obj.cacheSizeMegabytes = Math.round(message.cacheSizeMegabytes);
    }
    if (message.formFactor !== undefined && message.formFactor !== "") {
      obj.formFactor = message.formFactor;
    }
    if (message.interface !== undefined && message.interface !== "") {
      obj.interface = message.interface;
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageComponentDto>, I>>(base?: I): StorageComponentDto {
    return StorageComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageComponentDto>, I>>(object: I): StorageComponentDto {
    const message = createBaseStorageComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.capacityGigabytes = object.capacityGigabytes ?? 0;
    message.type = object.type ?? "";
    message.cacheSizeMegabytes = object.cacheSizeMegabytes ?? 0;
    message.formFactor = object.formFactor ?? "";
    message.interface = object.interface ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseStorageComponentListDto(): StorageComponentListDto {
  return { storageComponents: [] };
}

export const StorageComponentListDto = {
  encode(message: StorageComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storageComponents !== undefined && message.storageComponents.length !== 0) {
      for (const v of message.storageComponents) {
        StorageComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storageComponents!.push(StorageComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageComponentListDto {
    return {
      storageComponents: globalThis.Array.isArray(object?.storageComponents)
        ? object.storageComponents.map((e: any) => StorageComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StorageComponentListDto): unknown {
    const obj: any = {};
    if (message.storageComponents?.length) {
      obj.storageComponents = message.storageComponents.map((e) => StorageComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageComponentListDto>, I>>(base?: I): StorageComponentListDto {
    return StorageComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageComponentListDto>, I>>(object: I): StorageComponentListDto {
    const message = createBaseStorageComponentListDto();
    message.storageComponents = object.storageComponents?.map((e) => StorageComponentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVideoCardComponentDto(): VideoCardComponentDto {
  return {
    uuid: "",
    displayName: "",
    chipset: "",
    memoryGigabytes: 0,
    coreClock: 0,
    boostClock: 0,
    colour: "",
    lengthMillimeters: 0,
    price: 0,
  };
}

export const VideoCardComponentDto = {
  encode(message: VideoCardComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.chipset !== undefined && message.chipset !== "") {
      writer.uint32(26).string(message.chipset);
    }
    if (message.memoryGigabytes !== undefined && message.memoryGigabytes !== 0) {
      writer.uint32(32).int32(message.memoryGigabytes);
    }
    if (message.coreClock !== undefined && message.coreClock !== 0) {
      writer.uint32(40).int32(message.coreClock);
    }
    if (message.boostClock !== undefined && message.boostClock !== 0) {
      writer.uint32(48).int32(message.boostClock);
    }
    if (message.colour !== undefined && message.colour !== "") {
      writer.uint32(58).string(message.colour);
    }
    if (message.lengthMillimeters !== undefined && message.lengthMillimeters !== 0) {
      writer.uint32(64).int32(message.lengthMillimeters);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(72).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoCardComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoCardComponentDto();
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

          message.chipset = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.memoryGigabytes = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.coreClock = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.boostClock = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.colour = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.lengthMillimeters = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VideoCardComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      chipset: isSet(object.chipset) ? globalThis.String(object.chipset) : "",
      memoryGigabytes: isSet(object.memoryGigabytes) ? globalThis.Number(object.memoryGigabytes) : 0,
      coreClock: isSet(object.coreClock) ? globalThis.Number(object.coreClock) : 0,
      boostClock: isSet(object.boostClock) ? globalThis.Number(object.boostClock) : 0,
      colour: isSet(object.colour) ? globalThis.String(object.colour) : "",
      lengthMillimeters: isSet(object.lengthMillimeters) ? globalThis.Number(object.lengthMillimeters) : 0,
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: VideoCardComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.chipset !== undefined && message.chipset !== "") {
      obj.chipset = message.chipset;
    }
    if (message.memoryGigabytes !== undefined && message.memoryGigabytes !== 0) {
      obj.memoryGigabytes = Math.round(message.memoryGigabytes);
    }
    if (message.coreClock !== undefined && message.coreClock !== 0) {
      obj.coreClock = Math.round(message.coreClock);
    }
    if (message.boostClock !== undefined && message.boostClock !== 0) {
      obj.boostClock = Math.round(message.boostClock);
    }
    if (message.colour !== undefined && message.colour !== "") {
      obj.colour = message.colour;
    }
    if (message.lengthMillimeters !== undefined && message.lengthMillimeters !== 0) {
      obj.lengthMillimeters = Math.round(message.lengthMillimeters);
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VideoCardComponentDto>, I>>(base?: I): VideoCardComponentDto {
    return VideoCardComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VideoCardComponentDto>, I>>(object: I): VideoCardComponentDto {
    const message = createBaseVideoCardComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.chipset = object.chipset ?? "";
    message.memoryGigabytes = object.memoryGigabytes ?? 0;
    message.coreClock = object.coreClock ?? 0;
    message.boostClock = object.boostClock ?? 0;
    message.colour = object.colour ?? "";
    message.lengthMillimeters = object.lengthMillimeters ?? 0;
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseVideoCardComponentListDto(): VideoCardComponentListDto {
  return { videoCardComponents: [] };
}

export const VideoCardComponentListDto = {
  encode(message: VideoCardComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoCardComponents !== undefined && message.videoCardComponents.length !== 0) {
      for (const v of message.videoCardComponents) {
        VideoCardComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoCardComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoCardComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoCardComponents!.push(VideoCardComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VideoCardComponentListDto {
    return {
      videoCardComponents: globalThis.Array.isArray(object?.videoCardComponents)
        ? object.videoCardComponents.map((e: any) => VideoCardComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: VideoCardComponentListDto): unknown {
    const obj: any = {};
    if (message.videoCardComponents?.length) {
      obj.videoCardComponents = message.videoCardComponents.map((e) => VideoCardComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VideoCardComponentListDto>, I>>(base?: I): VideoCardComponentListDto {
    return VideoCardComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VideoCardComponentListDto>, I>>(object: I): VideoCardComponentListDto {
    const message = createBaseVideoCardComponentListDto();
    message.videoCardComponents = object.videoCardComponents?.map((e) => VideoCardComponentDto.fromPartial(e)) || [];
    return message;
  },
};

function createBasePowerSupplyComponentDto(): PowerSupplyComponentDto {
  return { uuid: "", displayName: "", type: "", efficiency: "", wattage: 0, modular: "", colour: "", price: 0 };
}

export const PowerSupplyComponentDto = {
  encode(message: PowerSupplyComponentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uuid !== undefined && message.uuid !== "") {
      writer.uint32(10).string(message.uuid);
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.type !== undefined && message.type !== "") {
      writer.uint32(26).string(message.type);
    }
    if (message.efficiency !== undefined && message.efficiency !== "") {
      writer.uint32(34).string(message.efficiency);
    }
    if (message.wattage !== undefined && message.wattage !== 0) {
      writer.uint32(40).int32(message.wattage);
    }
    if (message.modular !== undefined && message.modular !== "") {
      writer.uint32(50).string(message.modular);
    }
    if (message.colour !== undefined && message.colour !== "") {
      writer.uint32(58).string(message.colour);
    }
    if (message.price !== undefined && message.price !== 0) {
      writer.uint32(64).int32(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerSupplyComponentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerSupplyComponentDto();
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

          message.type = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.efficiency = reader.string();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.wattage = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.modular = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.colour = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.price = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PowerSupplyComponentDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      efficiency: isSet(object.efficiency) ? globalThis.String(object.efficiency) : "",
      wattage: isSet(object.wattage) ? globalThis.Number(object.wattage) : 0,
      modular: isSet(object.modular) ? globalThis.String(object.modular) : "",
      colour: isSet(object.colour) ? globalThis.String(object.colour) : "",
      price: isSet(object.price) ? globalThis.Number(object.price) : 0,
    };
  },

  toJSON(message: PowerSupplyComponentDto): unknown {
    const obj: any = {};
    if (message.uuid !== undefined && message.uuid !== "") {
      obj.uuid = message.uuid;
    }
    if (message.displayName !== undefined && message.displayName !== "") {
      obj.displayName = message.displayName;
    }
    if (message.type !== undefined && message.type !== "") {
      obj.type = message.type;
    }
    if (message.efficiency !== undefined && message.efficiency !== "") {
      obj.efficiency = message.efficiency;
    }
    if (message.wattage !== undefined && message.wattage !== 0) {
      obj.wattage = Math.round(message.wattage);
    }
    if (message.modular !== undefined && message.modular !== "") {
      obj.modular = message.modular;
    }
    if (message.colour !== undefined && message.colour !== "") {
      obj.colour = message.colour;
    }
    if (message.price !== undefined && message.price !== 0) {
      obj.price = Math.round(message.price);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PowerSupplyComponentDto>, I>>(base?: I): PowerSupplyComponentDto {
    return PowerSupplyComponentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PowerSupplyComponentDto>, I>>(object: I): PowerSupplyComponentDto {
    const message = createBasePowerSupplyComponentDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.type = object.type ?? "";
    message.efficiency = object.efficiency ?? "";
    message.wattage = object.wattage ?? 0;
    message.modular = object.modular ?? "";
    message.colour = object.colour ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBasePowerSupplyComponentListDto(): PowerSupplyComponentListDto {
  return { powerSupplyComponents: [] };
}

export const PowerSupplyComponentListDto = {
  encode(message: PowerSupplyComponentListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.powerSupplyComponents !== undefined && message.powerSupplyComponents.length !== 0) {
      for (const v of message.powerSupplyComponents) {
        PowerSupplyComponentDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerSupplyComponentListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerSupplyComponentListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.powerSupplyComponents!.push(PowerSupplyComponentDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PowerSupplyComponentListDto {
    return {
      powerSupplyComponents: globalThis.Array.isArray(object?.powerSupplyComponents)
        ? object.powerSupplyComponents.map((e: any) => PowerSupplyComponentDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PowerSupplyComponentListDto): unknown {
    const obj: any = {};
    if (message.powerSupplyComponents?.length) {
      obj.powerSupplyComponents = message.powerSupplyComponents.map((e) => PowerSupplyComponentDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PowerSupplyComponentListDto>, I>>(base?: I): PowerSupplyComponentListDto {
    return PowerSupplyComponentListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PowerSupplyComponentListDto>, I>>(object: I): PowerSupplyComponentListDto {
    const message = createBasePowerSupplyComponentListDto();
    message.powerSupplyComponents = object.powerSupplyComponents?.map((e) => PowerSupplyComponentDto.fromPartial(e)) ||
      [];
    return message;
  },
};

function createBaseComputerBuildDto(): ComputerBuildDto {
  return {
    uuid: "",
    displayName: "",
    description: "",
    username: "",
    cpuList: undefined,
    motherboardList: undefined,
    storageList: undefined,
    memoryList: undefined,
    videoCardList: undefined,
    powerSupplyList: undefined,
    creationDate: 0,
    lastUpdateDate: 0,
  };
}

export const ComputerBuildDto = {
  encode(message: ComputerBuildDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    if (message.cpuList !== undefined) {
      CpuComponentListDto.encode(message.cpuList, writer.uint32(42).fork()).ldelim();
    }
    if (message.motherboardList !== undefined) {
      MotherboardComponentListDto.encode(message.motherboardList, writer.uint32(50).fork()).ldelim();
    }
    if (message.storageList !== undefined) {
      StorageComponentListDto.encode(message.storageList, writer.uint32(58).fork()).ldelim();
    }
    if (message.memoryList !== undefined) {
      MemoryComponentListDto.encode(message.memoryList, writer.uint32(66).fork()).ldelim();
    }
    if (message.videoCardList !== undefined) {
      VideoCardComponentListDto.encode(message.videoCardList, writer.uint32(74).fork()).ldelim();
    }
    if (message.powerSupplyList !== undefined) {
      PowerSupplyComponentListDto.encode(message.powerSupplyList, writer.uint32(82).fork()).ldelim();
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      writer.uint32(88).int64(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      writer.uint32(96).int64(message.lastUpdateDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildDto();
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

          message.cpuList = CpuComponentListDto.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.motherboardList = MotherboardComponentListDto.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.storageList = StorageComponentListDto.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.memoryList = MemoryComponentListDto.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.videoCardList = VideoCardComponentListDto.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.powerSupplyList = PowerSupplyComponentListDto.decode(reader, reader.uint32());
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

  fromJSON(object: any): ComputerBuildDto {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      cpuList: isSet(object.cpuList) ? CpuComponentListDto.fromJSON(object.cpuList) : undefined,
      motherboardList: isSet(object.motherboardList)
        ? MotherboardComponentListDto.fromJSON(object.motherboardList)
        : undefined,
      storageList: isSet(object.storageList) ? StorageComponentListDto.fromJSON(object.storageList) : undefined,
      memoryList: isSet(object.memoryList) ? MemoryComponentListDto.fromJSON(object.memoryList) : undefined,
      videoCardList: isSet(object.videoCardList) ? VideoCardComponentListDto.fromJSON(object.videoCardList) : undefined,
      powerSupplyList: isSet(object.powerSupplyList)
        ? PowerSupplyComponentListDto.fromJSON(object.powerSupplyList)
        : undefined,
      creationDate: isSet(object.creationDate) ? globalThis.Number(object.creationDate) : 0,
      lastUpdateDate: isSet(object.lastUpdateDate) ? globalThis.Number(object.lastUpdateDate) : 0,
    };
  },

  toJSON(message: ComputerBuildDto): unknown {
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
    if (message.cpuList !== undefined) {
      obj.cpuList = CpuComponentListDto.toJSON(message.cpuList);
    }
    if (message.motherboardList !== undefined) {
      obj.motherboardList = MotherboardComponentListDto.toJSON(message.motherboardList);
    }
    if (message.storageList !== undefined) {
      obj.storageList = StorageComponentListDto.toJSON(message.storageList);
    }
    if (message.memoryList !== undefined) {
      obj.memoryList = MemoryComponentListDto.toJSON(message.memoryList);
    }
    if (message.videoCardList !== undefined) {
      obj.videoCardList = VideoCardComponentListDto.toJSON(message.videoCardList);
    }
    if (message.powerSupplyList !== undefined) {
      obj.powerSupplyList = PowerSupplyComponentListDto.toJSON(message.powerSupplyList);
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      obj.creationDate = Math.round(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      obj.lastUpdateDate = Math.round(message.lastUpdateDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputerBuildDto>, I>>(base?: I): ComputerBuildDto {
    return ComputerBuildDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildDto>, I>>(object: I): ComputerBuildDto {
    const message = createBaseComputerBuildDto();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.username = object.username ?? "";
    message.cpuList = (object.cpuList !== undefined && object.cpuList !== null)
      ? CpuComponentListDto.fromPartial(object.cpuList)
      : undefined;
    message.motherboardList = (object.motherboardList !== undefined && object.motherboardList !== null)
      ? MotherboardComponentListDto.fromPartial(object.motherboardList)
      : undefined;
    message.storageList = (object.storageList !== undefined && object.storageList !== null)
      ? StorageComponentListDto.fromPartial(object.storageList)
      : undefined;
    message.memoryList = (object.memoryList !== undefined && object.memoryList !== null)
      ? MemoryComponentListDto.fromPartial(object.memoryList)
      : undefined;
    message.videoCardList = (object.videoCardList !== undefined && object.videoCardList !== null)
      ? VideoCardComponentListDto.fromPartial(object.videoCardList)
      : undefined;
    message.powerSupplyList = (object.powerSupplyList !== undefined && object.powerSupplyList !== null)
      ? PowerSupplyComponentListDto.fromPartial(object.powerSupplyList)
      : undefined;
    message.creationDate = object.creationDate ?? 0;
    message.lastUpdateDate = object.lastUpdateDate ?? 0;
    return message;
  },
};

function createBaseComputerBuildListDto(): ComputerBuildListDto {
  return { computerBuilds: [] };
}

export const ComputerBuildListDto = {
  encode(message: ComputerBuildListDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.computerBuilds !== undefined && message.computerBuilds.length !== 0) {
      for (const v of message.computerBuilds) {
        ComputerBuildDto.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildListDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildListDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.computerBuilds!.push(ComputerBuildDto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputerBuildListDto {
    return {
      computerBuilds: globalThis.Array.isArray(object?.computerBuilds)
        ? object.computerBuilds.map((e: any) => ComputerBuildDto.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ComputerBuildListDto): unknown {
    const obj: any = {};
    if (message.computerBuilds?.length) {
      obj.computerBuilds = message.computerBuilds.map((e) => ComputerBuildDto.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputerBuildListDto>, I>>(base?: I): ComputerBuildListDto {
    return ComputerBuildListDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildListDto>, I>>(object: I): ComputerBuildListDto {
    const message = createBaseComputerBuildListDto();
    message.computerBuilds = object.computerBuilds?.map((e) => ComputerBuildDto.fromPartial(e)) || [];
    return message;
  },
};

function createBaseComputerBuildCommentDto(): ComputerBuildCommentDto {
  return { authorName: "", content: "", lastUpdatedDate: "" };
}

export const ComputerBuildCommentDto = {
  encode(message: ComputerBuildCommentDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildCommentDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildCommentDto();
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

  fromJSON(object: any): ComputerBuildCommentDto {
    return {
      authorName: isSet(object.authorName) ? globalThis.String(object.authorName) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      lastUpdatedDate: isSet(object.lastUpdatedDate) ? globalThis.String(object.lastUpdatedDate) : "",
    };
  },

  toJSON(message: ComputerBuildCommentDto): unknown {
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

  create<I extends Exact<DeepPartial<ComputerBuildCommentDto>, I>>(base?: I): ComputerBuildCommentDto {
    return ComputerBuildCommentDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildCommentDto>, I>>(object: I): ComputerBuildCommentDto {
    const message = createBaseComputerBuildCommentDto();
    message.authorName = object.authorName ?? "";
    message.content = object.content ?? "";
    message.lastUpdatedDate = object.lastUpdatedDate ?? "";
    return message;
  },
};

function createBaseComputerBuildDraftDto(): ComputerBuildDraftDto {
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

export const ComputerBuildDraftDto = {
  encode(message: ComputerBuildDraftDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildDraftDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildDraftDto();
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

  fromJSON(object: any): ComputerBuildDraftDto {
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

  toJSON(message: ComputerBuildDraftDto): unknown {
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

  create<I extends Exact<DeepPartial<ComputerBuildDraftDto>, I>>(base?: I): ComputerBuildDraftDto {
    return ComputerBuildDraftDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildDraftDto>, I>>(object: I): ComputerBuildDraftDto {
    const message = createBaseComputerBuildDraftDto();
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
