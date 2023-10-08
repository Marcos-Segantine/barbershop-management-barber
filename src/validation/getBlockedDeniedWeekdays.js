import { getMonth, getYear } from "../utils/dateHelper";
import { getWeekdayFromMonth } from "../utils/getWeekdayFromMonth";

export const getBlockedDeniedWeekdays = (lastMonthSelected, settings, setWeekdaysBlocked, setIsLoading) => {

    const formatDeniedDays = (data) => {
        const result = {}

        for (const day of data) {
            result[day] = {
                disableTouchEvent: true,
                disabled: true
            }
        }

        return result
    }

    if (lastMonthSelected === null) {
        const date = new Date()
        const currentYear = date.getFullYear()
        const currentMonth = date.getMonth() + 1
        const monthFormatted = currentMonth < 10 ? `0${currentMonth}` : currentMonth

        const data = []

        for (const weekday of settings.blockedWeekdays) {
            data.push(getWeekdayFromMonth(weekday, monthFormatted, currentYear))

            const result = []

            for (const dates of data) {

                for (const day of dates) {
                    const dayFormatted = day < 10 ? `0${day}` : day
                    result.push(`${currentYear}-${monthFormatted}-${dayFormatted}`)

                }
            }

            setWeekdaysBlocked(formatDeniedDays(result));
        }

        setIsLoading(false)
        return
    }
    else {

        const data = []

        for (const weekday of settings.blockedWeekdays) {
            data.push(getWeekdayFromMonth(weekday, getMonth(lastMonthSelected), getYear(lastMonthSelected)))

            const result = []

            for (const dates of data) {

                for (const day of dates) {
                    const currentYear = getYear(lastMonthSelected)
                    const currentMonth = getMonth(lastMonthSelected)
                    const dayFormatted = day < 10 ? `0${day}` : day

                    result.push(`${currentYear}-${currentMonth}-${dayFormatted}`)
                }
            }

            setWeekdaysBlocked(formatDeniedDays(result));
        }

        setIsLoading(false)
        return
    }
}
