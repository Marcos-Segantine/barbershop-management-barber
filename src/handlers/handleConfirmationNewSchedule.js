import { editExistingSchedule } from "../services/schedules/editExistingSchedule"
import { confirmNewSchedule } from "../services/schedules/confirmNewSchedule"

export const handleConfirmationNewSchedule = async (
    setIsLoading,
    schedule,
    isToUpdateSchedule,
    scheduleToUpdate,
    setModalContent,
    setSomethingWrong,
    navigation,
) => {
    setIsLoading(true)

    const allData = {
        name: schedule.client.name,
        email: schedule.client.email,
        phone: schedule.client.phone,
        clientUid: schedule.client.uid,
        profilePicture: schedule.client.profilePicture,
        scheduleUid: schedule.scheduleUid,
        services: schedule.services,
        professional: schedule.professional,
        professionalUid: schedule.professionalUid,
        day: schedule.day,
        schedule: schedule.schedule,
    }

    if (isToUpdateSchedule) await editExistingSchedule(
        scheduleToUpdate,
        allData,
        setModalContent,
        setSomethingWrong,
        setIsLoading,
        navigation,
        setIsLoading
    )
    else await confirmNewSchedule(
        allData,
        schedule.client.uid,
        setModalContent,
        setSomethingWrong,
        navigation,
        setIsLoading
    )
}