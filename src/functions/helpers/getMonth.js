export const getMonth = (scheduleUser) => {
    const month = scheduleUser.day.split("").slice(5, 7).join("");
    
    return month
}