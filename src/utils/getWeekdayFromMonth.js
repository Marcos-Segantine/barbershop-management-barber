export const getWeekdayFromMonth = (weekday, month, year) => {
    // Validate input
    if (+weekday < 0 || +weekday > 6 || +month < 1 || +month > 12) {
        return "Invalid input";
    }
    const result = []

    const firstDayOfNextMonth = new Date(year, month, 1);

    // Subtract one day to get the last day of the current month
    const lastDay = new Date(firstDayOfNextMonth - 1).getDate();

    for (let i = 1; i <= +lastDay; i++) {
        const weekdayFromCurrentDate = new Date(year, month - 1, i);
        if (+weekdayFromCurrentDate.getDay() === +weekday) {
            result.push(weekdayFromCurrentDate.getDate());
        }
    }
    return [...result];
}
