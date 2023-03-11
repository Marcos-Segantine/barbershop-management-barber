import { createContext, useState } from "react";

export const AddScheduleContext = createContext(null)

export const AddScheduleProvider = ({children}) => {
    const [schedule, setSchedule] = useState({})
    
    return(
        <AddScheduleContext.Provider value={{schedule, setSchedule}}>
            {children}
        </AddScheduleContext.Provider>
    )
}