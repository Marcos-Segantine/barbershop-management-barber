import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const updateProfessionalSchedules = async (professionalUid, newSchedules, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        await workingHoursRef.update(newSchedules)

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("updateProfessionalSchedules", message)
    }
}