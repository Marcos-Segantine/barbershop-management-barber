import { getMonth, getYear } from "../../utils/dateHelper"

export const filterSchedulesByDate = (schedules, date) => {
    if (schedules === null || schedules === undefined) return

    // Means that user want to filter schedules by year and month
    if (date[0] !== null && date[1] !== null) {
        date[0] = date[0].toString()
        date[1] = date[1].toString()

        return schedules.filter(schedule => {
            return getYear(schedule.day, setSomethingWrong) === date[0] && getMonth(schedule.day, setSomethingWrong) === date[1]
        })
    }

    // Means that user want to filter schedules by year
    else if (date[0] !== null && date[1] === null) {
        date[0] = date[0].toString()

        return schedules.filter(schedule => getYear(schedule.day, setSomethingWrong) === date[0])
    }

    // Means that user want to filter schedules by month
    else if (date[0] === null && date[1] !== null) {
        date[1] = date[1].toString()

        return schedules.filter(schedule => getMonth(schedule.day, setSomethingWrong) === date[1])
    }
}