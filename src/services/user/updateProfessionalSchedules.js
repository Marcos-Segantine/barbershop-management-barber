import firestore from '@react-native-firebase/firestore';

export const updateProfessionalSchedules = async (professionalUid, newSchedules, setSomethingWrong) => {
    try {

        const workingHoursRef = firestore().collection("working_hours").doc(professionalUid)
        const workingHoursDefaultRef = firestore().collection("working_hours").doc("default")

        const workingHoursData = (await workingHoursRef.get()).data()
        const workingHoursDefaultData = (await workingHoursDefaultRef.get()).data()

        const dataToUpdate = { ...workingHoursData, ...newSchedules }

        const defaultDataToUpdate = workingHoursDefaultData.times

        for (const weekDay in dataToUpdate) {
            if (weekDay === "barberName") continue

            for (const schedule of dataToUpdate[weekDay]) {
                if (defaultDataToUpdate.includes(schedule)) continue
                else defaultDataToUpdate.push(schedule)
            }
        }

        await workingHoursRef.update(dataToUpdate)
        await workingHoursDefaultRef.update({ times: [...defaultDataToUpdate] })

    } catch (error) {
        console.log(error);
        setSomethingWrong(true)
    }
}