import { cancelSchedule } from "../services/schedules/cancelSchedule"
import { fetchDataSchedulesClients } from "../services/schedules/fetchDataSchedulesClients"

export const handleScheduleDoneHome = async (
    setScheduleEarlier,
    scheduleEarlier,
    setSomethingWrong,
    setSchedulesOfProfessional,
    userData,

) => {
    setScheduleEarlier(null)

    await cancelSchedule(
        scheduleEarlier.clientUid,
        scheduleEarlier,
        setSomethingWrong
    )

    userData && fetchDataSchedulesClients(
        setSchedulesOfProfessional,
        userData.name,
        setSomethingWrong
    )
}