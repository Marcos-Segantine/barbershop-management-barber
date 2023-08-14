import { getDay, getMonth, getYear } from "./dateHelper";

export const isDatePassed = (date) => {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    const day = Number(getDay(date))
    const month = Number(getMonth(date))
    const year = Number(getYear(date))

    if (month < currentMonth && year === currentYear) return true
    if (day < currentDay && year === currentYear) return true
    return false
}
