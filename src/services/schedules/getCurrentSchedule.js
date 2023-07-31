export const getCurrentSchedule = async (schedulesOfProfessional, setScheduleEarlier) => {
    try {

        let earliest = null;

        for (const schedule of schedulesOfProfessional) {

            const [year, month, day] = schedule.day.split('-').map(Number);
            const [hour, minute] = schedule.schedule.split(':').map(Number);
            const date = new Date(year, month - 1, day, hour, minute);

            if (!earliest || date < earliest?.date) {
                earliest = { schedule, date };
            }
        }

        setScheduleEarlier(earliest ? earliest.schedule : [])

    } catch (error) {
        console.log(error);
    }
}
