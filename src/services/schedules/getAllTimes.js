import firestore from '@react-native-firebase/firestore';
import { handleError } from '../../handlers/handleError';

export const getAllTimes = async (setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc("default")
        const workingHoursData = (await workingHoursRef.get()).data().times

        return workingHoursData
        
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllTimes", message)
    }
}