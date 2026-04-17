import { ComponentType } from "react";

export interface TabConfig {
  id: string;
  label: string;
  slides: ComponentType[];
  slideLabels?: Record<number, string>;
}
