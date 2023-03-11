export const clearSchedule = (shedulesUser, setShedulesUser) => {
    console.log(shedulesUser);
    
    const propsToClear = ["day", "professional", "service", "shedule"]
    for (const data in shedulesUser) {
        if(propsToClear.includes(data)) shedulesUser[data] = null
    }

    setShedulesUser(shedulesUser)
}