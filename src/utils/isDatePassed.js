export const isDatePassed = (date) => {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth();
    
    const day = new Date(date).getDate()
    const month = new Date(date).getMonth()

    if(month < currentMonth) return true
    if(day < currentDay) return true
    return false
}
