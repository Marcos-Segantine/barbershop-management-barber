import { createContext, useState } from "react";

export const CreateNewPersonContext = createContext(null)

export const CreateNewPersonProvider = ({ children }) => {
    const [createNewPerson, setCreateNewPearson] = useState(null)

    return (
        <CreateNewPersonContext.Provider value={{ createNewPerson, setCreateNewPearson }}>
            {children}
        </CreateNewPersonContext.Provider>
    )
}