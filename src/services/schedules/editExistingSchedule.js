import { cancelSchedule } from './cancelSchedule';
import { confirmNewSchedule } from './confirmNewSchedule';


export const editExistingSchedule = async (
    scheduleToChange,
    newSchedule,
    setModalContent,
    setSomethingWrong,
    navigation,
    setIsLoading
) => {
    try {
        await cancelSchedule(
            scheduleToChange.clientUid,
            scheduleToChange
        )
        confirmNewSchedule(
            newSchedule,
            newSchedule.clientUid,
            setModalContent,
            navigation,
            setIsLoading
        )

    } catch (error) {
        console.error(error);
        setSomethingWrong(true)
    }
}
