import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const getAllTimesFromProfessional = async (professionalUid, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        const workingHoursData = (await workingHoursRef.get()).data()

        return workingHoursData

    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllTimesFromProfessional", message)
    }
}