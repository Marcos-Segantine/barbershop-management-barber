import firestore from '@react-native-firebase/firestore';

export const getAllSchedulesOfProfessional = async (professionalUid, setCurrentTimes) => {
    try {

        const workingHoursRef = firestore().collection('working_hours').doc(professionalUid)
        const workingHoursData = (await workingHoursRef.get({ source: "server" })).data()

        setCurrentTimes(workingHoursData)
    } catch ({ message }) {
        console.log(error);
    }
}