import { createContext, useState } from "react";

export const SomethingWrongContext = createContext()

export const SomethingWrongProvider = ({ children }) => {
    const [somethingWrong, setSomethingWrong] = useState(false)

    return (
        <SomethingWrongContext.Provider value={{ somethingWrong, setSomethingWrong }}>
            {children}
        </SomethingWrongContext.Provider>
    )
}
