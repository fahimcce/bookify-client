import { NavLink } from "react-router-dom";
import { TNavbarItem } from "../types/navbarItems";

export const navbarGenerator = (navbarItems: TNavbarItem[]) => {
    const navbar = navbarItems.map(items => {
        if (!items.name || items?.index) {
            return null
        }
        return {
            key: items?.name,
            label: <NavLink to={`${items?.path}`}>{items?.name}</NavLink>
        }
    })
    return navbar
}