export const setDataToUpdateSchedulesByUser = (schedule, client, professionalName) => {
    return {
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
    };
}