import { createContext, useState } from "react";

export const MenuItemContext = createContext(null)

export const MenuItemProvider = ({ children }) => {
    const [itemSelected, setItemSelected] = useState("home")

    return (
        <MenuItemContext.Provider value={{ itemSelected, setItemSelected }}>
            {children}
        </MenuItemContext.Provider>
    )
}