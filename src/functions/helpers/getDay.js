export const getDay = (shedulesUser) => {
    const day = shedulesUser?.day?.split("").slice(8).join("");
    
    return day !== undefined ? day : null
}