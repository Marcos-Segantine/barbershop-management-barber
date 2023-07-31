export const isDatePassed = (date) => {
    const currentDate = new Date();

    if (!(date instanceof Date)) date = new Date(date);

    return date < currentDate;
}
