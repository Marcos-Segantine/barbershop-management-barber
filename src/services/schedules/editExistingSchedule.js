import { handleError } from '../../handlers/handleError';

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

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("editExistingSchedule", message)
    }
}
