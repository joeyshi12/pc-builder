/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "models";

export interface UserProfile {
  username?: string | undefined;
  displayName?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
}

export interface CpuComponent {
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

export interface CpuComponentList {
  cpuComponents?: CpuComponent[] | undefined;
}

export interface MotherboardComponent {
  uuid?: string | undefined;
  displayName?: string | undefined;
  cpuSocket?: string | undefined;
  formFactor?: string | undefined;
  maxMemoryGigabytes?: number | undefined;
  numMemorySlots?: number | undefined;
  colour?: string | undefined;
  price?: number | undefined;
}

export interface MotherboardComponentList {
  motherboardComponents?: MotherboardComponent[] | undefined;
}

export interface MemoryComponent {
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

export interface MemoryComponentList {
  memoryComponents?: MemoryComponent[] | undefined;
}

export interface StorageComponent {
  uuid?: string | undefined;
  displayName?: string | undefined;
  capacityGigabytes?: number | undefined;
  type?: string | undefined;
  cacheSizeMegabytes?: number | undefined;
  formFactor?: string | undefined;
  interface?: string | undefined;
  price?: number | undefined;
}

export interface StorageComponentList {
  storageComponents?: StorageComponent[] | undefined;
}

export interface VideoCardComponent {
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

export interface VideoCardComponentList {
  videoCardComponents?: VideoCardComponent[] | undefined;
}

export interface PowerSupplyComponent {
  uuid?: string | undefined;
  displayName?: string | undefined;
  type?: string | undefined;
  efficiency?: string | undefined;
  wattage?: number | undefined;
  modular?: string | undefined;
  colour?: string | undefined;
  price?: number | undefined;
}

export interface PowerSupplyComponentList {
  powerSupplyComponents?: PowerSupplyComponent[] | undefined;
}

export interface ComputerBuild {
  uuid?: string | undefined;
  displayName?: string | undefined;
  description?: string | undefined;
  username?: string | undefined;
  cpuList?: CpuComponentList | undefined;
  motherboardList?: MotherboardComponentList | undefined;
  storageList?: StorageComponentList | undefined;
  memoryList?: MemoryComponentList | undefined;
  videoCardList?: VideoCardComponentList | undefined;
  powerSupplyList?: PowerSupplyComponentList | undefined;
  creationDate?: number | undefined;
  lastUpdateDate?: number | undefined;
}

export interface ComputerBuildList {
  computerBuilds?: ComputerBuild[] | undefined;
}

export interface ComputerBuildComment {
  authorName?: string | undefined;
  content?: string | undefined;
  lastUpdatedDate?: string | undefined;
}

export interface ComputerBuildDraft {
  displayName?: string | undefined;
  description?: string | undefined;
  cpuIds?: string[] | undefined;
  motherboardIds?: string[] | undefined;
  storageIds?: string[] | undefined;
  memoryIds?: string[] | undefined;
  videoCardIds?: string[] | undefined;
  powerSupplyIds?: string[] | undefined;
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

function createBaseCpuComponent(): CpuComponent {
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

export const CpuComponent = {
  encode(message: CpuComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): CpuComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCpuComponent();
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

  fromJSON(object: any): CpuComponent {
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

  toJSON(message: CpuComponent): unknown {
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

  create<I extends Exact<DeepPartial<CpuComponent>, I>>(base?: I): CpuComponent {
    return CpuComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CpuComponent>, I>>(object: I): CpuComponent {
    const message = createBaseCpuComponent();
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

function createBaseCpuComponentList(): CpuComponentList {
  return { cpuComponents: [] };
}

export const CpuComponentList = {
  encode(message: CpuComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.cpuComponents !== undefined && message.cpuComponents.length !== 0) {
      for (const v of message.cpuComponents) {
        CpuComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CpuComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCpuComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.cpuComponents!.push(CpuComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CpuComponentList {
    return {
      cpuComponents: globalThis.Array.isArray(object?.cpuComponents)
        ? object.cpuComponents.map((e: any) => CpuComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CpuComponentList): unknown {
    const obj: any = {};
    if (message.cpuComponents?.length) {
      obj.cpuComponents = message.cpuComponents.map((e) => CpuComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CpuComponentList>, I>>(base?: I): CpuComponentList {
    return CpuComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CpuComponentList>, I>>(object: I): CpuComponentList {
    const message = createBaseCpuComponentList();
    message.cpuComponents = object.cpuComponents?.map((e) => CpuComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMotherboardComponent(): MotherboardComponent {
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

export const MotherboardComponent = {
  encode(message: MotherboardComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MotherboardComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMotherboardComponent();
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

  fromJSON(object: any): MotherboardComponent {
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

  toJSON(message: MotherboardComponent): unknown {
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

  create<I extends Exact<DeepPartial<MotherboardComponent>, I>>(base?: I): MotherboardComponent {
    return MotherboardComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MotherboardComponent>, I>>(object: I): MotherboardComponent {
    const message = createBaseMotherboardComponent();
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

function createBaseMotherboardComponentList(): MotherboardComponentList {
  return { motherboardComponents: [] };
}

export const MotherboardComponentList = {
  encode(message: MotherboardComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.motherboardComponents !== undefined && message.motherboardComponents.length !== 0) {
      for (const v of message.motherboardComponents) {
        MotherboardComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MotherboardComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMotherboardComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.motherboardComponents!.push(MotherboardComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MotherboardComponentList {
    return {
      motherboardComponents: globalThis.Array.isArray(object?.motherboardComponents)
        ? object.motherboardComponents.map((e: any) => MotherboardComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MotherboardComponentList): unknown {
    const obj: any = {};
    if (message.motherboardComponents?.length) {
      obj.motherboardComponents = message.motherboardComponents.map((e) => MotherboardComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MotherboardComponentList>, I>>(base?: I): MotherboardComponentList {
    return MotherboardComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MotherboardComponentList>, I>>(object: I): MotherboardComponentList {
    const message = createBaseMotherboardComponentList();
    message.motherboardComponents = object.motherboardComponents?.map((e) => MotherboardComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMemoryComponent(): MemoryComponent {
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

export const MemoryComponent = {
  encode(message: MemoryComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MemoryComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemoryComponent();
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

  fromJSON(object: any): MemoryComponent {
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

  toJSON(message: MemoryComponent): unknown {
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

  create<I extends Exact<DeepPartial<MemoryComponent>, I>>(base?: I): MemoryComponent {
    return MemoryComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemoryComponent>, I>>(object: I): MemoryComponent {
    const message = createBaseMemoryComponent();
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

function createBaseMemoryComponentList(): MemoryComponentList {
  return { memoryComponents: [] };
}

export const MemoryComponentList = {
  encode(message: MemoryComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.memoryComponents !== undefined && message.memoryComponents.length !== 0) {
      for (const v of message.memoryComponents) {
        MemoryComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MemoryComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemoryComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.memoryComponents!.push(MemoryComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MemoryComponentList {
    return {
      memoryComponents: globalThis.Array.isArray(object?.memoryComponents)
        ? object.memoryComponents.map((e: any) => MemoryComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: MemoryComponentList): unknown {
    const obj: any = {};
    if (message.memoryComponents?.length) {
      obj.memoryComponents = message.memoryComponents.map((e) => MemoryComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MemoryComponentList>, I>>(base?: I): MemoryComponentList {
    return MemoryComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MemoryComponentList>, I>>(object: I): MemoryComponentList {
    const message = createBaseMemoryComponentList();
    message.memoryComponents = object.memoryComponents?.map((e) => MemoryComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseStorageComponent(): StorageComponent {
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

export const StorageComponent = {
  encode(message: StorageComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageComponent();
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

  fromJSON(object: any): StorageComponent {
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

  toJSON(message: StorageComponent): unknown {
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

  create<I extends Exact<DeepPartial<StorageComponent>, I>>(base?: I): StorageComponent {
    return StorageComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageComponent>, I>>(object: I): StorageComponent {
    const message = createBaseStorageComponent();
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

function createBaseStorageComponentList(): StorageComponentList {
  return { storageComponents: [] };
}

export const StorageComponentList = {
  encode(message: StorageComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.storageComponents !== undefined && message.storageComponents.length !== 0) {
      for (const v of message.storageComponents) {
        StorageComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): StorageComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStorageComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.storageComponents!.push(StorageComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StorageComponentList {
    return {
      storageComponents: globalThis.Array.isArray(object?.storageComponents)
        ? object.storageComponents.map((e: any) => StorageComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: StorageComponentList): unknown {
    const obj: any = {};
    if (message.storageComponents?.length) {
      obj.storageComponents = message.storageComponents.map((e) => StorageComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StorageComponentList>, I>>(base?: I): StorageComponentList {
    return StorageComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StorageComponentList>, I>>(object: I): StorageComponentList {
    const message = createBaseStorageComponentList();
    message.storageComponents = object.storageComponents?.map((e) => StorageComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVideoCardComponent(): VideoCardComponent {
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

export const VideoCardComponent = {
  encode(message: VideoCardComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoCardComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoCardComponent();
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

  fromJSON(object: any): VideoCardComponent {
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

  toJSON(message: VideoCardComponent): unknown {
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

  create<I extends Exact<DeepPartial<VideoCardComponent>, I>>(base?: I): VideoCardComponent {
    return VideoCardComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VideoCardComponent>, I>>(object: I): VideoCardComponent {
    const message = createBaseVideoCardComponent();
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

function createBaseVideoCardComponentList(): VideoCardComponentList {
  return { videoCardComponents: [] };
}

export const VideoCardComponentList = {
  encode(message: VideoCardComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.videoCardComponents !== undefined && message.videoCardComponents.length !== 0) {
      for (const v of message.videoCardComponents) {
        VideoCardComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VideoCardComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoCardComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoCardComponents!.push(VideoCardComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VideoCardComponentList {
    return {
      videoCardComponents: globalThis.Array.isArray(object?.videoCardComponents)
        ? object.videoCardComponents.map((e: any) => VideoCardComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: VideoCardComponentList): unknown {
    const obj: any = {};
    if (message.videoCardComponents?.length) {
      obj.videoCardComponents = message.videoCardComponents.map((e) => VideoCardComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VideoCardComponentList>, I>>(base?: I): VideoCardComponentList {
    return VideoCardComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VideoCardComponentList>, I>>(object: I): VideoCardComponentList {
    const message = createBaseVideoCardComponentList();
    message.videoCardComponents = object.videoCardComponents?.map((e) => VideoCardComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBasePowerSupplyComponent(): PowerSupplyComponent {
  return { uuid: "", displayName: "", type: "", efficiency: "", wattage: 0, modular: "", colour: "", price: 0 };
}

export const PowerSupplyComponent = {
  encode(message: PowerSupplyComponent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerSupplyComponent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerSupplyComponent();
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

  fromJSON(object: any): PowerSupplyComponent {
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

  toJSON(message: PowerSupplyComponent): unknown {
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

  create<I extends Exact<DeepPartial<PowerSupplyComponent>, I>>(base?: I): PowerSupplyComponent {
    return PowerSupplyComponent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PowerSupplyComponent>, I>>(object: I): PowerSupplyComponent {
    const message = createBasePowerSupplyComponent();
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

function createBasePowerSupplyComponentList(): PowerSupplyComponentList {
  return { powerSupplyComponents: [] };
}

export const PowerSupplyComponentList = {
  encode(message: PowerSupplyComponentList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.powerSupplyComponents !== undefined && message.powerSupplyComponents.length !== 0) {
      for (const v of message.powerSupplyComponents) {
        PowerSupplyComponent.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PowerSupplyComponentList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePowerSupplyComponentList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.powerSupplyComponents!.push(PowerSupplyComponent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PowerSupplyComponentList {
    return {
      powerSupplyComponents: globalThis.Array.isArray(object?.powerSupplyComponents)
        ? object.powerSupplyComponents.map((e: any) => PowerSupplyComponent.fromJSON(e))
        : [],
    };
  },

  toJSON(message: PowerSupplyComponentList): unknown {
    const obj: any = {};
    if (message.powerSupplyComponents?.length) {
      obj.powerSupplyComponents = message.powerSupplyComponents.map((e) => PowerSupplyComponent.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PowerSupplyComponentList>, I>>(base?: I): PowerSupplyComponentList {
    return PowerSupplyComponentList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PowerSupplyComponentList>, I>>(object: I): PowerSupplyComponentList {
    const message = createBasePowerSupplyComponentList();
    message.powerSupplyComponents = object.powerSupplyComponents?.map((e) => PowerSupplyComponent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseComputerBuild(): ComputerBuild {
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

export const ComputerBuild = {
  encode(message: ComputerBuild, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
      CpuComponentList.encode(message.cpuList, writer.uint32(42).fork()).ldelim();
    }
    if (message.motherboardList !== undefined) {
      MotherboardComponentList.encode(message.motherboardList, writer.uint32(50).fork()).ldelim();
    }
    if (message.storageList !== undefined) {
      StorageComponentList.encode(message.storageList, writer.uint32(58).fork()).ldelim();
    }
    if (message.memoryList !== undefined) {
      MemoryComponentList.encode(message.memoryList, writer.uint32(66).fork()).ldelim();
    }
    if (message.videoCardList !== undefined) {
      VideoCardComponentList.encode(message.videoCardList, writer.uint32(74).fork()).ldelim();
    }
    if (message.powerSupplyList !== undefined) {
      PowerSupplyComponentList.encode(message.powerSupplyList, writer.uint32(82).fork()).ldelim();
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      writer.uint32(88).int64(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      writer.uint32(96).int64(message.lastUpdateDate);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuild {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuild();
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

          message.cpuList = CpuComponentList.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.motherboardList = MotherboardComponentList.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.storageList = StorageComponentList.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.memoryList = MemoryComponentList.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.videoCardList = VideoCardComponentList.decode(reader, reader.uint32());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.powerSupplyList = PowerSupplyComponentList.decode(reader, reader.uint32());
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

  fromJSON(object: any): ComputerBuild {
    return {
      uuid: isSet(object.uuid) ? globalThis.String(object.uuid) : "",
      displayName: isSet(object.displayName) ? globalThis.String(object.displayName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      cpuList: isSet(object.cpuList) ? CpuComponentList.fromJSON(object.cpuList) : undefined,
      motherboardList: isSet(object.motherboardList)
        ? MotherboardComponentList.fromJSON(object.motherboardList)
        : undefined,
      storageList: isSet(object.storageList) ? StorageComponentList.fromJSON(object.storageList) : undefined,
      memoryList: isSet(object.memoryList) ? MemoryComponentList.fromJSON(object.memoryList) : undefined,
      videoCardList: isSet(object.videoCardList) ? VideoCardComponentList.fromJSON(object.videoCardList) : undefined,
      powerSupplyList: isSet(object.powerSupplyList)
        ? PowerSupplyComponentList.fromJSON(object.powerSupplyList)
        : undefined,
      creationDate: isSet(object.creationDate) ? globalThis.Number(object.creationDate) : 0,
      lastUpdateDate: isSet(object.lastUpdateDate) ? globalThis.Number(object.lastUpdateDate) : 0,
    };
  },

  toJSON(message: ComputerBuild): unknown {
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
      obj.cpuList = CpuComponentList.toJSON(message.cpuList);
    }
    if (message.motherboardList !== undefined) {
      obj.motherboardList = MotherboardComponentList.toJSON(message.motherboardList);
    }
    if (message.storageList !== undefined) {
      obj.storageList = StorageComponentList.toJSON(message.storageList);
    }
    if (message.memoryList !== undefined) {
      obj.memoryList = MemoryComponentList.toJSON(message.memoryList);
    }
    if (message.videoCardList !== undefined) {
      obj.videoCardList = VideoCardComponentList.toJSON(message.videoCardList);
    }
    if (message.powerSupplyList !== undefined) {
      obj.powerSupplyList = PowerSupplyComponentList.toJSON(message.powerSupplyList);
    }
    if (message.creationDate !== undefined && message.creationDate !== 0) {
      obj.creationDate = Math.round(message.creationDate);
    }
    if (message.lastUpdateDate !== undefined && message.lastUpdateDate !== 0) {
      obj.lastUpdateDate = Math.round(message.lastUpdateDate);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputerBuild>, I>>(base?: I): ComputerBuild {
    return ComputerBuild.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuild>, I>>(object: I): ComputerBuild {
    const message = createBaseComputerBuild();
    message.uuid = object.uuid ?? "";
    message.displayName = object.displayName ?? "";
    message.description = object.description ?? "";
    message.username = object.username ?? "";
    message.cpuList = (object.cpuList !== undefined && object.cpuList !== null)
      ? CpuComponentList.fromPartial(object.cpuList)
      : undefined;
    message.motherboardList = (object.motherboardList !== undefined && object.motherboardList !== null)
      ? MotherboardComponentList.fromPartial(object.motherboardList)
      : undefined;
    message.storageList = (object.storageList !== undefined && object.storageList !== null)
      ? StorageComponentList.fromPartial(object.storageList)
      : undefined;
    message.memoryList = (object.memoryList !== undefined && object.memoryList !== null)
      ? MemoryComponentList.fromPartial(object.memoryList)
      : undefined;
    message.videoCardList = (object.videoCardList !== undefined && object.videoCardList !== null)
      ? VideoCardComponentList.fromPartial(object.videoCardList)
      : undefined;
    message.powerSupplyList = (object.powerSupplyList !== undefined && object.powerSupplyList !== null)
      ? PowerSupplyComponentList.fromPartial(object.powerSupplyList)
      : undefined;
    message.creationDate = object.creationDate ?? 0;
    message.lastUpdateDate = object.lastUpdateDate ?? 0;
    return message;
  },
};

function createBaseComputerBuildList(): ComputerBuildList {
  return { computerBuilds: [] };
}

export const ComputerBuildList = {
  encode(message: ComputerBuildList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.computerBuilds !== undefined && message.computerBuilds.length !== 0) {
      for (const v of message.computerBuilds) {
        ComputerBuild.encode(v!, writer.uint32(10).fork()).ldelim();
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildList {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.computerBuilds!.push(ComputerBuild.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ComputerBuildList {
    return {
      computerBuilds: globalThis.Array.isArray(object?.computerBuilds)
        ? object.computerBuilds.map((e: any) => ComputerBuild.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ComputerBuildList): unknown {
    const obj: any = {};
    if (message.computerBuilds?.length) {
      obj.computerBuilds = message.computerBuilds.map((e) => ComputerBuild.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ComputerBuildList>, I>>(base?: I): ComputerBuildList {
    return ComputerBuildList.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildList>, I>>(object: I): ComputerBuildList {
    const message = createBaseComputerBuildList();
    message.computerBuilds = object.computerBuilds?.map((e) => ComputerBuild.fromPartial(e)) || [];
    return message;
  },
};

function createBaseComputerBuildComment(): ComputerBuildComment {
  return { authorName: "", content: "", lastUpdatedDate: "" };
}

export const ComputerBuildComment = {
  encode(message: ComputerBuildComment, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildComment {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildComment();
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

  fromJSON(object: any): ComputerBuildComment {
    return {
      authorName: isSet(object.authorName) ? globalThis.String(object.authorName) : "",
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      lastUpdatedDate: isSet(object.lastUpdatedDate) ? globalThis.String(object.lastUpdatedDate) : "",
    };
  },

  toJSON(message: ComputerBuildComment): unknown {
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

  create<I extends Exact<DeepPartial<ComputerBuildComment>, I>>(base?: I): ComputerBuildComment {
    return ComputerBuildComment.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildComment>, I>>(object: I): ComputerBuildComment {
    const message = createBaseComputerBuildComment();
    message.authorName = object.authorName ?? "";
    message.content = object.content ?? "";
    message.lastUpdatedDate = object.lastUpdatedDate ?? "";
    return message;
  },
};

function createBaseComputerBuildDraft(): ComputerBuildDraft {
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

export const ComputerBuildDraft = {
  encode(message: ComputerBuildDraft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): ComputerBuildDraft {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseComputerBuildDraft();
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

  fromJSON(object: any): ComputerBuildDraft {
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

  toJSON(message: ComputerBuildDraft): unknown {
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

  create<I extends Exact<DeepPartial<ComputerBuildDraft>, I>>(base?: I): ComputerBuildDraft {
    return ComputerBuildDraft.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ComputerBuildDraft>, I>>(object: I): ComputerBuildDraft {
    const message = createBaseComputerBuildDraft();
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
