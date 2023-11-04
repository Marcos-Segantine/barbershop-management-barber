import { getCurrentHour } from "../../utils/getCurrentHour";

export const getCurrentSchedule = async (schedulesOfProfessional, setScheduleEarlier, setIsLoading, setSomethingWrong) => {
    try {

        let earliest = null;

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();
        const currentHor = getCurrentHour(setSomethingWrong);

        for (const schedule of schedulesOfProfessional) {

            const [year, month, day] = schedule.day.split('-').map(Number);
            const [hour, minute] = schedule.schedule.split(':').map(Number);
            const date = new Date(year, month - 1, day, hour, minute);

            if (year === currentYear && month === currentMonth && day === currentDay && hour < currentHor) continue

            if (!earliest || date < earliest?.date) {
                earliest = { schedule, date };
            }
        }

        setScheduleEarlier(earliest ? earliest.schedule : [])
        setIsLoading(false)

    } catch ({ message }) {
        console.log(error);
    }
}
