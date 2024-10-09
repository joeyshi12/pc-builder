import { CpuComponent, MemoryComponent, MotherboardComponent, PowerSupplyComponent, StorageComponent, VideoCardComponent } from "../transfers/pc_component";

export type PcComponents = {
  cpuList: CpuComponent[];
  motherboardList: MotherboardComponent[];
  memoryList: MemoryComponent[];
  storageList: StorageComponent[];
  videoCardList: VideoCardComponent[];
  powerSupplyList: PowerSupplyComponent[];
}
