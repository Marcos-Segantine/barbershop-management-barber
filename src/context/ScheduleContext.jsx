import { createContext, useState } from "react";

export const ScheduleContext = createContext(null)

export const ScheduleProvider = ({ children }) => {
    const [schedule, setSchedule] = useState({})

    return (
        <ScheduleContext.Provider value={{ schedule, setSchedule }}>
            {children}
        </ScheduleContext.Provider>
    )
}