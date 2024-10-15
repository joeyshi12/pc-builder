import { CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from "../../transfers/pc_component";

export type PcComponents = {
  cpuList: CpuComponent[];
  motherboardList: MotherboardComponent[];
  memoryList: MemoryComponent[];
  storageList: StorageComponent[];
  videoCardList: VideoCardComponent[];
  powerSupplyList: PowerSupplyComponent[];
};

export type PcComponent =
  | CpuComponent
  | MotherboardComponent
  | MemoryComponent
  | StorageComponent
  | VideoCardComponent
  | PowerSupplyComponent;

export type PcComponentType =
  | "cpu"
  | "motherboard"
  | "memory"
  | "storage"
  | "video-card"
  | "power-supply";
