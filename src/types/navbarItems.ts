import { ReactNode } from "react";

export type TNavbarItem = {
  name?: string;
  index?: boolean;
  path?: string;
  element: ReactNode;
  children?: TNavbarItem[];
};
