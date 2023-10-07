import firestore from '@react-native-firebase/firestore';

export const updateProfessionalSchedules = async (professionalUid, newSchedules, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        const workingHoursDefaultRef = firestore().collection("working_hours").doc("default")

        const workingHoursDefaultData = (await workingHoursDefaultRef.get()).data()

        const defaultDataToUpdate = workingHoursDefaultData.times

        for (const weekDay in newSchedules) {
            for (const time of newSchedules[weekDay]) {
                if (!defaultDataToUpdate.includes(time)) defaultDataToUpdate.push(time)
            }
        }

        await workingHoursRef.update(newSchedules)
        await workingHoursDefaultRef.update({ times: [...defaultDataToUpdate] })

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}