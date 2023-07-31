import firestore from '@react-native-firebase/firestore';

export const getAllTimes = async () => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc("default")
        const workingHoursData = (await workingHoursRef.get()).data().times

        return workingHoursData
        
    } catch (error) {
        console.log(error);
    }
}