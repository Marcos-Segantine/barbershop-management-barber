import { getDay, getMonth, getYear } from "./dateHelper";

export const isDatePassed = (date) => {
    const currentDay = +new Date().getDate();
    const currentMonth = +new Date().getMonth() + 1;
    const currentYear = +new Date().getFullYear();

    const day = +getDay(date)
    const month = +getMonth(date)
    const year = +getYear(date)

    if (year < currentYear) return true
    else if (month < currentMonth && year === currentYear) return true
    else if (day < currentDay && month === currentMonth && year === currentYear) return true
    return false
}
