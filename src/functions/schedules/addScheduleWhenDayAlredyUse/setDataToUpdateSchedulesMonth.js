export const setDataToUpdateSchedulesMonth = (
    schedulesMonthData,
    scheduleDay,
    professionalName,
    atualSchedulesProfessional,
    scheduleHour,
    schedule,
    client
) => {
    return {
        ...schedulesMonthData,
        [scheduleDay]: {
            [professionalName]: {
                ...atualSchedulesProfessional,
                [scheduleHour]: {
                    day: schedule.day,
                    email: client.email,
                    name: client.name,
                    password: client.password,
                    phone: client.phone,
                    professional: professionalName,
                    service: schedule.service,
                    scheduleUid: schedule.scheduleUid,
                    shedule: schedule.shedule,
                    uid: client.uid,
                },
            },
        },
    }
}