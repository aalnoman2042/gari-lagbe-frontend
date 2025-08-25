import { ComponentType } from "react";

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType; // React component type
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "RIDER" | "DRIVER"