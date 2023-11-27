import firestore from '@react-native-firebase/firestore';

import { handleError } from '../../handlers/handleError';

export const getAllSchedulesOfProfessional = async (professionalUid, setCurrentTimes, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)
        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()

        setCurrentTimes(workingHoursData)
    } catch ({ message }) {
        setSomethingWrong(true)
        handleError("getAllSchedulesOfProfessional", message)    
    }
}