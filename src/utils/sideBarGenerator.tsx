import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export type TSidebarItems = {
    name?: string;
    path?: string;
    element?: ReactNode;
    children?: TSidebarItems[];
};
export type TsidebarElements =
    | {
        key: string | undefined;
        label: ReactNode;
        children?: TsidebarElements[];
    }
    | undefined;
export const sideBarItemsGenertor = (sideBarItems: TSidebarItems[], role: string) => {
    return sideBarItems.reduce((acc: TsidebarElements[], items) => {
        if (items.name && items.path) {
            acc.push({
                key: items.name,
                label: <NavLink to={`/${role}/${items.path}`}>{items.name}</NavLink>
            })
        }
        if (items.children) {
            acc.push({
                key: items.name,
                label: items.name,
                children: items.children.map(child => {
                    if (child?.name) {
                        return {
                            key: child.name,
                            label: <NavLink to={`/${role}/${child.path}`}> {child.name}</NavLink>
                        }
                    }
                })
            })
        }
        return acc
    }, [])
};
