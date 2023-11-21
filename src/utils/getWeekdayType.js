export const getWeekdayType = (day) => {
    return day <= 5 ? "weekday" : day === 6 ? "saturday" : "sunday"
}