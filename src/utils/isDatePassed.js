import { handleError } from "../handlers/handleError";

import { getDay, getMonth, getYear } from "./dateHelper";

export const isDatePassed = (date, hourSchedule, setSomethingWrong) => {
    try {
        const currentDay = +new Date().getDate();
        const currentMonth = +new Date().getMonth() + 1;
        const currentYear = +new Date().getFullYear();
        const currentHour = +new Date().getHours();

        const day = +getDay(date, setSomethingWrong)
        const month = +getMonth(date, setSomethingWrong)
        const year = +getYear(date, setSomethingWrong)
        const hour = Number(hourSchedule.split(":")[0])

        if (year < currentYear) return true
        else if (month < currentMonth && year === currentYear) return true
        else if (day < currentDay && month === currentMonth && year === currentYear) return true
        else if (hour < currentHour && day === currentDay && month === currentMonth && year === currentYear) return true
        return false

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("isDatePassed", message)
    }
}
