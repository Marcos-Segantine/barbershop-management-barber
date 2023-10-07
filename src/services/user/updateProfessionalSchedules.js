import firestore from '@react-native-firebase/firestore';

export const updateProfessionalSchedules = async (professionalUid, newSchedules, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        await workingHoursRef.update(newSchedules)

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}