import { getDay, getMonth } from "./dateHelper";

export const isDatePassed = (date) => {
    const currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;

    const day = Number(getDay(date))
    const month = Number(getMonth(date))

    if (month < currentMonth) return true
    if (day < currentDay) return true
    return false
}
