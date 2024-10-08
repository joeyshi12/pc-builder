/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "transfers";

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
