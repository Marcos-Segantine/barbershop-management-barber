export const setDataToUpdateSchedulesMonth = (scheduleDay, scheduleHour, scheduleProfessional, schedule) => {
    return {
        [scheduleDay]: {
            [scheduleProfessional]: {
                [scheduleHour]: {
                    day: schedule.day,
                    email: schedule.client.email,
                    name: schedule.client.name,
                    password: schedule.client.password,
                    phone: schedule.client.phone,
                    professional: scheduleProfessional,
                    scheduleUid: schedule.scheduleUid,
                    shedule: schedule.shedule,
                    uid: schedule.client.uid,
                },
            },
        },
    };
}