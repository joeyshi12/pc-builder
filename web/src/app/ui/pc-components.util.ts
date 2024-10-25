import { PcComponents, PcComponentType } from "../data/pc-component/pc-component";

type ComponentItem = {
  displayName: string;
  price: string;
};

export type ComponentListModel = {
  displayName: string;
  componentType: PcComponentType;
  items: ComponentItem[];
};

export function toComponentListModels(pcComponents: PcComponents): ComponentListModel[] {
  return [
    {
      displayName: "CPU",
      componentType: "cpu",
      items: pcComponents.cpuList.map(component => {
        const clockString = component.coreClock ? ` ${component.coreClock} GHz` : "";
        const coreCountString = component.coreCount ? ` ${component.coreCount}-Core` : "";
        const displayName = component.displayName + clockString + coreCountString + " Processor";
        const price = _formPriceString(component.price);
        return {displayName, price}
      }),
    },
    {
      displayName: "Motherboard",
      componentType: "motherboard",
      items: pcComponents.motherboardList.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: _formPriceString(component.price)
        };
      }),
    },
    {
      displayName: "Memory",
      componentType: "memory",
      items: pcComponents.memoryList.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: _formPriceString(component.price)
        };
      }),
    },
    {
      displayName: "Storage",
      componentType: "storage",
      items: pcComponents.storageList.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: _formPriceString(component.price)
        };
      }),
    },
    {
      displayName: "Video card",
      componentType: "video-card",
      items: pcComponents.videoCardList.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: _formPriceString(component.price)
        };
      }),
    },
    {
      displayName: "Power supply",
      componentType: "power-supply",
      items: pcComponents.powerSupplyList.map(component => {
        return {
          displayName: component.displayName ?? "",
          price: _formPriceString(component.price)
        };
      }),
    },
  ];
}

function _formPriceString(price: number | undefined): string {
  return price ? `$${price}` : "N/A";
}
