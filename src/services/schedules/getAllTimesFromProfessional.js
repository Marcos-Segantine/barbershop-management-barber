import firestore from '@react-native-firebase/firestore';

export const getAllTimesFromProfessional = async (professionalUid) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        const workingHoursData = (await workingHoursRef.get()).data()

        return workingHoursData

    } catch ({ message }) {
        console.log(error);
    }
}